/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.view.user.PermissionTree', {
    extend: 'Beaux.desktop.XWindow',



    requires: [
        'Ext.data.TreeStore',
        'Ext.tree.Column',
        'Ext.tree.Panel',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.Permission'
    ],

    bind: {
        title: '用户@{data.id} -> 所有权限'
    },


    initComponent: function () {
        var me = this,
            username = me.getViewModel().get('data.id'),
            store = Ext.create('Ext.data.TreeStore', {
                model: 'Finetrust.model.Permission',
                parentIdProperty: 'parent_fk',
                proxy: {
                    url: '/api/User/' + username + '/permission',
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
                    text: '代号',
                    dataIndex: 'code'
                }, {
                    text: '名称',
                    dataIndex: 'name'
                }, {
                    text: '说明',
                    dataIndex: 'memo'
                }]
            });

        me.items = [panel];

        me.callParent();
    } 
});