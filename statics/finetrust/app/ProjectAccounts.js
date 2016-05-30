/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectAccounts', {
   extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.data.MyRestProxy',
        'Finetrust.model.Project',
        'Finetrust.viewmodel.ProjectAccounts',
        'Finetrust.model.ProjectAccount'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.project.accounts.Grid',
        detail: 'Finetrust.view.project.accounts.Detail',
        detailViewModel: 'project_accounts'
    }
});