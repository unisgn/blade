/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.app.ProjectBasicDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.model.Project',
        'Finetrust.view.project.BasicDetail'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.Project'
            },
                _cfg = cfg || {};

            if (_cfg.id) {
                links.id = _cfg.model;
            } else {
                links.create = true;
            }

            Ext.create('Finetrust.view.project.BasicDetail', {
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