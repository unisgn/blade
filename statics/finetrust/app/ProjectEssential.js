/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.app.ProjectEssential', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Project',
        'Finetrust.model.ProjectEssential',
        'Finetrust.view.project.essential.Detail',
        'Finetrust.view.project.essential.Grid'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.ProjectEssential',
        grid: 'Finetrust.view.project.essential.Grid',
        detail: 'Finetrust.view.project.essential.Detail'
    }
});