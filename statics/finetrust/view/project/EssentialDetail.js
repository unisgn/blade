/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.EssentialDetail', {
    extend: 'Finetrust.view.ModelDetail',
    
    requires: [
        'Finetrust.model.Project',
        'Finetrust.data.Dict'
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
            fieldLabel: 'setup_date',
            name: 'setup_date',
            bind: '{data.setup_date}',
            xtype: 'datefield'
        },{
            fieldLabel: 'ContractStatus',
            name: 'contract_status',
            bind: '{data.contract_status}',
            xtype: 'combobox',
            store: {
                data: Finetrust.data.Dict.get('contract_status'),
                fields: ['key', 'text']
            },
            valueField: 'key',
            displayField: 'text'
        }]
    }
});