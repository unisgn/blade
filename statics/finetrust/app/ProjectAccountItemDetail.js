/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectAccountItemDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.controller.ProjectAccountsItemDetail',
        'Finetrust.view.project.AccountItemDetail'
    ],

    statics: {
        launch: function (cfg) {

            Ext.create('Finetrust.view.project.AccountItemDetail', {
                controller: 'project-accounts-item-detail',
                viewModel: Ext.create('Ext.app.ViewModel', {
                    data: {
                        data: cfg.model
                    }
                }),
                readonly: !!cfg.readonly
            }).show();
        }
    }
});