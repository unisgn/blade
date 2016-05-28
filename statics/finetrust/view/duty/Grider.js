/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.duty.Grider', {
    extend: 'Beaux.desktop.XWindow',


    requires: [
        'Finetrust.model.Duty',
        'Finetrust.view.EntityGrid'
    ],

    title: '岗位',

    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.Duty',
        store: {
            model: 'Finetrust.model.Duty',
            autoLoad: true
        },
        columns: [{
            text: '编号',
            dataIndex: 'code',
            flex: 1
        }, {
            text: '名称',
            dataIndex: 'name',
            flex: 1
        },{
            text: '说明',
            dataIndex: 'brief',
            flex: 1
        }]
    }

});