Ext.define('Finetrust.app.ProductCategory', {
    extend: 'Finetrust.app.Entity',
    requires: [
        'Finetrust.model.ProductCategory',
        'Finetrust.view.productCategory.Grider',
        'Finetrust.view.productCategory.Detail'
    ],


    inheritableStatics: {
        model: 'Finetrust.model.ProductCategory',
        grid: 'Finetrust.view.productCategory.Grider',
        detail: 'Finetrust.view.productCategory.Detail'
    }
    
});