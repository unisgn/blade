/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.app.DutyDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.view.duty.Detail'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.Duty'
            },
                _cfg = cfg || {};
            if (_cfg.model) {
                links.id = _cfg.model.getId();
            } else {
                links.create = true;
            }
            Ext.create('Finetrust.view.duty.Detail', {
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