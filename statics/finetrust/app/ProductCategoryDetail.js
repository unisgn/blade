
Ext.define('Finetrust.app.ProductCategoryDetail', {
    extend: 'Beaux.Application',
    requires: [
        'Finetrust.view.productCategory.Detail',
        'Finetrust.model.ProductCategory'
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