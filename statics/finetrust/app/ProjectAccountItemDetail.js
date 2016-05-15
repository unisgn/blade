/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectAccountItemDetail', {
    extend: 'Beaux.Application',

    requqires: [
        'Finetrust.view.project.AccountItemDetail',
        'Finetrust.model.ProjectAccount'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.ProjectAccount'
            },
                _cfg = cfg || {};

            if (_cfg.id) {
                links.id = _cfg.id;
            } else {
                links.create = true;
            }

            Ext.create('Finetrust.view.project.AccountItemDetail', {
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