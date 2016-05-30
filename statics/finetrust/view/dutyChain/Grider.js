/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.dutyChain.Grider', {
    extend: 'Beaux.desktop.XWindow',


    title: '审批链设置',

    requires: [
        'Finetrust.model.DutyChain',
        'Finetrust.view.EntityGrid'
    ],


    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.DutyChain',
        store: {
            model: 'Finetrust.model.DutyChain',
            autoLoad: true
        },
        columns: [{
            text: 'Code',
            dataIndex: 'code',
            flex: 1
        }, {
            text: 'Name',
            dataIndex: 'name',
            flex: 1
        }, {
            text: 'members',
            dataIndex: 'members',
            renderer: v => {
                if (v) {
                    let ds = Finetrust.data.Dict.keymap('duty');

                    return v.split(',').map(x => ds[x].text).join(',');
                }
                return v;
            },
            flex: 2
        }, {
            text: 'brief',
            dataIndex: 'brief',
            flex: 1
        }]
    }

});