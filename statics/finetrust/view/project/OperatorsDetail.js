/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.OperatorsDetail', {
    extend: 'Finetrust.view.ModelDetail',
    
    requires: [
        'Finetrust.model.Project'
    ],
    
    items: {
        xtype: 'form',
        defaultType: 'textfield',
        defaults: {
            readOnly: false
        },
        items: [{
            fieldLabel: 'Number',
            name: 'number',
            bind: '{data.number}',
            readOnly: true
        }, {
            fieldLabel: 'Code',
            name: 'code',
            bind: '{data.code}',
            readOnly: true
        }, {
            fieldLabel: 'Name',
            name: 'name',
            bind: '{data.name}',
            readOnly: true
        }, {
            fieldLabel: '帐套',
            name: 'acct_num',
            bind: '{data.acct_num}'
        },{
            fieldLabel: '资产代码',
            name: 'asset_code',
            bind: '{data.asset_code}',
        }]
    }
});