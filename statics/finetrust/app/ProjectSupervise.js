/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.app.ProjectSupervise', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.data.MyRestProxy',
        'Finetrust.model.Project',
        'Finetrust.model.ProjectAccount',
        'Finetrust.view.project.supervise.Detail',
        'Finetrust.viewmodel.ProjectSupervise',
        'Finetrust.view.project.supervise.Grid'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.project.supervise.Grid',
        detail: 'Finetrust.view.project.supervise.Detail',
        detailViewModel: 'project_supervise'
    }
});