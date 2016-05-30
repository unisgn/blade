/**
 * Created by 0xFranCiS on May 28, 2016.
 */
Ext.define('Finetrust.app.DutyChain', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.DutyChain'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.DutyChain',
        grid: 'Finetrust.view.dutyChain.Grider',
        detail: 'Finetrust.view.dutyChain.Detail'
    }
});