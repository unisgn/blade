/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.view.role.Updator', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.TreeStore',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Anchor',
        'Ext.tree.Column',
        'Ext.tree.Panel',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.CheckedPermission',
        'Finetrust.model.Permission'
    ],

    bind: {
        title: '角色@{data.code}'
    },

    config: {
        mode: 'readonly',
        roleId: null
    },

    layout: {
        type: 'anchor',
        reserveScrollbar: true
    },

    scrollable: true,

    width: 800,
    // height: 600,


    initComponent: function () {
        var me = this,
            roleId = me.getRoleId(),
            mode = me.getMode(),
            store = Ext.create('Ext.data.TreeStore', {
                model: mode === 'update' ? 'Finetrust.model.CheckedPermission' : 'Finetrust.model.Permission',
                parentIdProperty: 'parentId',
                proxy: {
                    url: '/api/Role/' + roleId + '/permission',
                    type: 'my-ajax',
                    extraParams: {
                        checked: mode == 'update' ? '1' : '0'
                    }
                }
            }), panel = Ext.create('Ext.tree.Panel', {

                forceFit: true,

                minHeight: 320,

                rootVisible: false,

                forceFit: true,
                store: store,
                viewConfig: {
                    stripeRows: true,
                    rowLines: true
                },

                useArrows: true,

                columns: [{
                    xtype: 'treecolumn',
                    text: '编号',
                    dataIndex: 'code'
                }, {
                    text: '说明',
                    dataIndex: 'memo'
                }]
            });

        Ext.apply(me, {
            items: [{
                xtype: 'form',
                bodyPadding: 5,
                defaultType: 'textfield',
                defaults: {
                    readOnly: mode == 'readonly'
                },
                items: [{
                    fieldLabel: '代码',
                    name: 'code',
                    bind: '{data.code}'
                }, {
                    fieldLabel: '说明',
                    xtype: 'textarea',
                    bind: '{data.memo}'
                }]
            }, panel
            ]
        });

        if (mode === 'update') {
            Ext.apply(me, {
                buttons: [{
                    text: '保存',
                    handler: function () {
                        var ids = panel.getChecked().map(e => e.getId());
                        Ext.Ajax.request({
                            url: '/api/Role/' + roleId + '/permission',
                            method: 'post',
                            jsonData: {
                                permissions: ids
                            }
                        });
                    }
                }]
            });
        }

        me.callParent();

        if (me.mode === 'update') {
            panel.on('checkchange', (node, checked) => {

                var it = function (nd) {
                    nd.set('checked', checked);
                    nd.eachChild(c => {
                        it(c);
                    });
                };
                it(node);
            });
        }

    }
});