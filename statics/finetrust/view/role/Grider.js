/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.view.role.Grider', {
    extend: 'Finetrust.view.EntityGrid',

    xtype: 'role-grid',

    requires: [
        'Finetrust.model.Role'
    ],

    app: 'Finetrust.app.Role',
    store: {
        model: 'Finetrust.model.Role',
        autoLoad: true
    },
    columns: [{
        text: '代码',
        dataIndex: 'code'
    }, {
        text: '说明',
        dataIndex: 'memo'
    }]

})
;