/**
 * Created by 0xFranCiS on May 13, 2016.
 */
Ext.define('Finetrust.view.productCategory.Grid', {
    extend: 'Finetrust.view.EntityTreeGrid',
    
    xtype: 'productcategory-grid',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Finetrust.model.ProductCategory',
        'Finetrust.view.EntityTreeGrid'
    ],



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
        text: 'fullname',
        dataIndex: 'fullname',
        flex: 3
    }]
});