/**
 * Created by 0xFranCiS on May 13, 2016.
 */

Ext.define('Finetrust.view.productCategory.Grider', {
    extend: 'Finetrust.view.EntityTreeGrid',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Finetrust.model.ProductCategory',
        'Finetrust.view.EntityTreeGrid'
    ],


    detailApp: 'Finetrust.app.ProductCategoryDetail',

    store: {
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
    },

    columns: [{
        xtype: 'treecolumn',
        text: 'Name',
        dataIndex: 'name',
        flex: 2
    }, {
        text: 'code',
        dataIndex: 'code',
        flex: 1
    }, {
        text: 'brief',
        dataIndex: 'brief',
        flex: 3
    }]
});