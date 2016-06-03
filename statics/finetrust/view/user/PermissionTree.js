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
        title: '用户@{data.username} -> 所有权限'
    },


    initComponent: function () {
        var me = this,
            username = me.getViewModel().get('data.username'),
            store = Ext.create('Ext.data.TreeStore', {
                model: 'Finetrust.model.Permission',
                parentIdProperty: 'parentId',
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
                    text: '编号',
                    dataIndex: 'code'
                }, {
                    text: '说明',
                    dataIndex: 'memo'
                }]
            });

        me.items = [panel];

        me.callParent();
    } 
});