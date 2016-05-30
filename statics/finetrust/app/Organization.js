/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.app.Organization', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Organization'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Organization',
        grid: 'Finetrust.view.organization.Grid',
        detail: 'Finetrust.view.organization.Detail'
    }
});