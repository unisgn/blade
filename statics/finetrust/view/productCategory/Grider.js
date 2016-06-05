/**
 * Created by 0xFranCiS on May 28, 2016.
 */
Ext.define('Finetrust.view.productCategory.Grider', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.tree.Column',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.ProductCategory',
        'Finetrust.view.EntityGrid'
    ],


    title: '产品目录树',


    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.ProductCategory',

        store: {
            model: 'Finetrust.model.ProductCategory',
            autoLoad: true,

            parentIdProperty: 'parent_fk',
            proxy: {
                type: 'my-ajax',
                url: '/api/tree/ProductCategory'
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
    }
});