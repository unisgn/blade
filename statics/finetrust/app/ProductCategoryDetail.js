Ext.define('Finetrust.app.ProductCategoryDetail', {
    extend: 'Beaux.Application',
    requires: [
        'Ext.app.ViewModel',
        'Finetrust.view.productCategory.Detail'
    ],

    statics: {
        launch: function (cfg) {
            var me = this, cfg = cfg || {};
            Ext.apply(cfg, {
                viewModel: Ext.create('Ext.app.ViewModel', me.viewmodel_cfg(cfg, 'Finetrust.model.ProductCategory')),
                readonly: !!cfg.readonly
            });
            Ext.create('Finetrust.view.productCategory.Detail', cfg).show();
        }
    }
});