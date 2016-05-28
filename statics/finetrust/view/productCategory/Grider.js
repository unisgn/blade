/**
 * Created by 0xFranCiS on May 28, 2016.
 */
Ext.define('Finetrust.view.productCategory.Grider', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.view.productCategory.Grid'
    ],
    
    
    title: '产品目录树',
    

    items: {
        xtype: 'productcategory-grid',
        app: 'Finetrust.app.ProductCategory'
    }
});