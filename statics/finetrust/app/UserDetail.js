/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.app.UserDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.view.user.Detail'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.User'
            },
                _cfg = cfg || {};
            if (_cfg.id) {
                links.id = _cfg.model;
            } else {
                links.create = true;
            }
            Ext.create('Finetrust.view.user.Detail', {
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