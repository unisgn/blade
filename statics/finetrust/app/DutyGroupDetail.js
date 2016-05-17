/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.app.DutyGroupDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.view.dutyChain.Detail'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.DutyGroup'
            },
                _cfg = cfg || {};
            if (_cfg.model) {
                links.id = _cfg.model.getId();
            } else {
                links.create = true;
            }
            Ext.create('Finetrust.view.dutyChain.Detail', {
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