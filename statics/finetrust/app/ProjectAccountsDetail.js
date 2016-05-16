/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectAccountsDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Ext.data.Model',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Finetrust.model.ProjectAccount',
        'Finetrust.view.project.AccountsDetail'
    ],

    statics: {
        launch: function (cfg) {
            
    
            Ext.create('Finetrust.view.project.AccountsDetail', {
                viewModel: Ext.create('Ext.app.ViewModel', {
                    stores: {
                        accounts: {
                            model: 'Finetrust.model.ProjectAccount',
                            autoLoad: true,
                            proxy: {
                                url: '/api/Project/' + cfg.model.getId() + '/accounts',
                                type: 'rest',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            }
                        }
                    },
                    data: {
                        data: cfg.model
                    }
                }),
                readonly: !!cfg.readonly
            }).show();
        }
    }
});