/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.app.User', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.User',
        'Finetrust.view.user.Grider',
        'Finetrust.view.user.Detail'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.User',
        grid: 'Finetrust.view.user.Grider',
        detail: 'Finetrust.view.user.Detail'
    }
});