/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectOperatorsDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.view.project.OperatorsDetail'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.Project'
            },
                _cfg = cfg || {};

            if (_cfg.model) {
                links.id = _cfg.model.getId();
            } else {
                links.create = true;
            }

            Ext.create('Finetrust.view.project.OperatorsDetail', {
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