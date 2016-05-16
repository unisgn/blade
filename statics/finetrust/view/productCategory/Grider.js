/**
 * Created by 0xFranCiS on May 13, 2016.
 */

Ext.define('Finetrust.view.productCategory.Grider', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.tree.Column',
        'Finetrust.model.ProductCategory',
        'Finetrust.view.EntityTreeGrid'
    ],

    // items: {
    //     xtype: 'entity-grid',
    //     store: Ext.create('Ext.data.TreeStore', {
    //         model: 'Finetrust.model.ProductCategory'
    //     }),
    //     columns: [{
    //         xtype: 'treecolumn',
    //         text: 'Name',
    //         dataIndex: 'name'
    //     }, {
    //         text: 'brief',
    //         dataIndex: 'brief'
    //     }]
    // },

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            items: [
                Ext.create('Finetrust.view.EntityTreeGrid', {
                    detailApp: 'Finetrust.app.ProductCategoryDetail',
                    rootVisible: false,
                    store: Ext.create('Ext.data.TreeStore', {
                        model: 'Finetrust.model.ProductCategory',
                        autoLoad: true,

                        parentIdProperty: 'parent_id',
                        proxy: {
                            type: 'ajax',
                            url: '../api/tree/ProductCategory',
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        }
                    }),
                    columns: [{
                        xtype: 'treecolumn',
                        text: 'Name',
                        dataIndex: 'name',
                        flex: 2
                    }, {
                        text: 'code',
                        dataIndex: 'code',
                        flex: 1
                    },{
                        text: 'brief',
                        dataIndex: 'brief',
                        flex: 3
                    }]
                })
            ]
        });

        me.callParent();

    }
});