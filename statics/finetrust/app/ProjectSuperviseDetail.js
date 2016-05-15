/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectSuperviseDetail', {
    extend: 'Beaux.Application',

    requqires: [
        'Finetrust.view.project.SuperviseDetail',
        'Finetrust.model.Project',
        'Finetrust.model.ProjectSuperviseIssue'
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
            
            var url = '/api/Project/' + _cfg.id + '/supervise_issues';
            Finetrust.model.ProjectSuperviseIssue.setProxy(Ext.create('Ext.data.proxy.Rest',{
                url: url,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }));

            // console.log(Finetrust.model.ProjectAccount.getProxy());

            Ext.create('Finetrust.view.project.SuperviseDetail', {
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