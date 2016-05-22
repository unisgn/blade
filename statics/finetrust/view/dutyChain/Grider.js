/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.dutyChain.Grider', {
    extend: 'Beaux.desktop.XWindow',


    title: '审批链设置',

    requires: [
        'Finetrust.model.DutyChain',
        'Finetrust.model.Duty',
        'Finetrust.view.EntityGrid'
    ],


    items: {
        xtype: 'entity-grid',
        detailApp: 'Finetrust.app.DutyChainDetail',
        store: {
            model: 'Finetrust.model.DutyChain',
            autoLoad: true
        },
        columns: [{
            text: 'Code',
            dataIndex: 'code'
        }, {
            text: 'Name',
            dataIndex: 'name'
        }, {
            text: 'brief',
            dataIndex: 'brief'
        },{
            text: 'members',
            dataIndex: 'member_text_csv'
        }]
    }

});