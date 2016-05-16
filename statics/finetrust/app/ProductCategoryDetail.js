
Ext.define('Finetrust.app.ProductCategoryDetail', {
    extend: 'Beaux.Application',
    requires: [
        'Ext.app.ViewModel',
        'Finetrust.view.productCategory.Detail'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.ProductCategory'
            },
                _cfg = cfg || {};
            if (_cfg.id) {
                links.id = _cfg.id;
            } else {
                links.create = true;
            }
            Ext.create('Finetrust.view.productCategory.Detail', {
                viewModel: Ext.create('Ext.app.ViewModel', {
                    links: {
                        data: links
                    }
                }),
                readonly: !!_cfg.readonly
            }).show();
        }
    }
});