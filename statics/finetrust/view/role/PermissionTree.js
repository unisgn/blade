/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.view.role.PermissionTree', {
    extend: 'Beaux.desktop.XWindow',


    xtype: 'role-permission-tree',

    requires: [
        'Ext.data.TreeStore',
        'Ext.tree.Column',
        'Ext.tree.Panel',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.CheckedPermission'
    ],

    bind: {
        title: '{data.code}->所有权限'
    },


    initComponent: function () {
        var me = this,
            roleId = me.getViewModel().get('data.id'),
            store = Ext.create('Ext.data.TreeStore', {
                model: 'Finetrust.model.RolePermission',
                parentIdProperty: 'parentId',
                proxy: {
                    url: '/api/Role/' + roleId + '/permission',
                    type: 'my-ajax'
                }
            }),
            panel = Ext.create('Ext.tree.Panel', {

                forceFit: true,

                rootVisible: false,

                forceFit: true,
                store: store,

                viewConfig: {
                    stripeRows: true
                },

                columns: [{
                    xtype: 'treecolumn',
                    text: '编号',
                    dataIndex: 'code'
                }, {
                    text: '说明',
                    dataIndex: 'memo'
                }]
            });

        me.items = [panel];
        me.buttons = [{
            text: '保存',
            handler: () => {
                var ids = panel.getChecked().map(e => e.getId());
                Ext.Ajax.request({
                    url: '/api/Role/' + roleId + '/permission',
                    method: 'post',
                    jsonData: {
                        permissions: ids
                    }
                });
            }
        }, {
            text: '刷新',
            handler: () => {
                store.reload();
            }
        }];


        me.callParent();


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

});