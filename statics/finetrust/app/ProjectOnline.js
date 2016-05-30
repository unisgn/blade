/**
 * Created by 0xFranCiS on May 29, 2016.
 */

Ext.define('Finetrust.app.ProjectOnline', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Project',
        'Finetrust.view.project.online.Grid',
        'Finetrust.view.project.online.Detail'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.project.online.Grid',
        detail: 'Finetrust.view.project.online.Detail'
    }
});