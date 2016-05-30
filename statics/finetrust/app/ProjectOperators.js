/**
 * Created by 0xFranCiS on May 29, 2016.
 */

Ext.define('Finetrust.app.ProjectOperators', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Project',
        'Finetrust.view.project.operators.Grid',
        'Finetrust.view.project.operators.Detail'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.project.operators.Grid',
        detail: 'Finetrust.view.project.operators.Detail'
    }
});