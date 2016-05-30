/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.app.ProjectSuperviseJournal', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Project',
        'Finetrust.view.project.supervise.journal.Grid',
        'Finetrust.view.project.supervise.journal.Detail'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.project.supervise.journal.Grid',
        detail: 'Finetrust.view.project.supervise.journal.Detail'
    }
});