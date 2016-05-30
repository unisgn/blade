/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.app.ProjectArchive', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Project',
        'Finetrust.view.project.archive.Detail',
        'Finetrust.view.project.archive.Grid',
        'Finetrust.viewmodel.ProjectArchive'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.project.archive.Grid',
        detail: 'Finetrust.view.project.archive.Detail',
        detailViewModel: 'project_archive'
    }
});