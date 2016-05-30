/**
 * Created by 0xFranCiS on May 29, 2016.
 */

Ext.define('Finetrust.app.ProjectOperation', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Project',
        'Finetrust.view.project.operation.Grid',
        'Finetrust.view.project.operation.Detail'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.project.operation.Grid',
        detail: 'Finetrust.view.project.operation.Detail'
    }
});