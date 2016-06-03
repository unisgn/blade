/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.viewmodel.ProjectAccounts', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.project_accounts',

    requires: [
        'Finetrust.data.MyRestProxy',
        'Finetrust.model.ProjectAccount'
    ],

    stores: {
        accounts: {
            model: 'Finetrust.model.ProjectAccount',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'my-rest',
                url: '/api/Project/{data.id}/accounts'
            }
        }
    }
});