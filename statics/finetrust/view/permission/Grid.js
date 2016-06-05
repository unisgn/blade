/**
 * Created by 0xFranCiS on May 30, 2016.
 */
Ext.define('Finetrust.view.permission.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.tree.Column',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Finetrust.controller.PermissionGrid',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.Permission',
        'Finetrust.view.EntityTreeGrid'
    ],

    title: '权限管理',

    items: {
        xtype: 'entity-treegrid',
        controller: 'permission-grid',
        app: 'Finetrust.app.Permission',
        viewConfig: {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true
            },
            stripeRows: true
        },

        useArrows: true,
        // rootVisible: false,
        store: {
            model: 'Finetrust.model.Permission',
            autoLoad: true,
            parentIdProperty: 'parent_fk',
            autoSync: true,
            proxy: {
                type: 'my-ajax',
                url: '/api/tree/Permission'
            },
            sorters: 'name'
        },
        columns: [{
            xtype: 'treecolumn',
            text: '代码',
            dataIndex: 'code'
        }, {
            text: '名称',
            dataIndex: 'name'
        }, {
            text: '说明',
            dataIndex: 'memo'
        }]
    }
});