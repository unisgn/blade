/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.duty.Grider', {
    extend: 'Beaux.desktop.XWindow',


    requires: [
        'Finetrust.model.Duty',
        'Finetrust.view.EntityGrid'
    ],


    items: {
        xtype: 'entity-grid',
        detailApp: 'Finetrust.app.DutyDetail',
        store: {
            model: 'Finetrust.model.Duty',
            autoLoad: true
        },
        columns: [{
            text: 'Code',
            dataIndex: 'code'
        }, {
            text: 'Name',
            dataIndex: 'name'
        },{
            text: 'brief',
            dataIndex: 'brief'
        }]
    }

});