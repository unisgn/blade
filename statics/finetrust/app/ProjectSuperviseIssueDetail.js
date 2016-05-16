/**
 * Created by 0xFranCiS on May 15, 2016.
 */
Ext.define('Finetrust.app.ProjectSuperviseIssueDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Finetrust.view.project.SuperviseIssueDetail',
        'Finetrust.model.ProjectSuperviseIssue'
    ],

    statics: {
        launch: function (cfg) {
            var links = {
                type: 'Finetrust.model.ProjectSuperviseIssue'
            },
                _cfg = cfg || {};

            if (_cfg.id) {
                links.id = _cfg.id;
            } else {
                links.create = true;
            }

            Ext.create('Finetrust.view.project.SuperviseIssueDetail', {
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