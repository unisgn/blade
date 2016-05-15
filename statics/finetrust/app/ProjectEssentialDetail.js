/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */
Ext.define('Finetrust.app.ProjectEssentialDetail', {
    extend: 'Beaux.Application',

    requqires: [
        'Finetrust.view.project.EssentialDetail',
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

            Ext.create('Finetrust.view.project.EssentialDetail', {
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