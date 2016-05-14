/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.app.ProjectBasicDetail', {
    extend: 'Beaux.Application',

    requqires: [
        'Finetrust.view.project.BasicDetail',
        'Finetrust.model.Project'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.Project'
            },
                _cfg = cfg || {};

            if (_cfg.id) {
                links.id = _cfg.id;
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