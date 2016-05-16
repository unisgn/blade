/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectAccountsDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Finetrust.view.project.AccountsDetail',
        'Finetrust.model.Project',
        'Finetrust.model.ProjectAccount'
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
            
            var url = '/api/Project/' + _cfg.id + '/accounts';
            Finetrust.model.ProjectAccount.setProxy(Ext.create('Ext.data.proxy.Rest',{
                url: url,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }));

            // console.log(Finetrust.model.ProjectAccount.getProxy());

            Ext.create('Finetrust.view.project.AccountsDetail', {
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