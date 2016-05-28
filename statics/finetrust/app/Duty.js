/**
 * Created by 0xFranCiS on May 28, 2016.
 */
Ext.define('Finetrust.app.Duty', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Duty'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Duty',
        grid: 'Finetrust.view.duty.Grider',
        detail: 'Finetrust.view.duty.Detail'
    }
});