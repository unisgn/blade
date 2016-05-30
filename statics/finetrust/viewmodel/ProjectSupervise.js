/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.viewmodel.ProjectSupervise', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.project_supervise',

    requires: [
        'Finetrust.data.MyRestProxy',
        'Finetrust.model.ProjectAccount'
    ],

    stores: {
        issues: {
            model: 'Finetrust.model.ProjectAccount',
            autoLoad: true,
            proxy: {
                type: 'my-rest',
                url: '../api/Project/{data.id}/supervise_issues'
            }
        }
    }
});