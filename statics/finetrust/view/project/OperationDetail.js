/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.OperationDetail', {
    extend: 'Finetrust.view.EntityDetail',
    
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
            fieldLabel: '到期日',
            name: 'due_date',
            bind: '{data.due_date}',
            xtype: 'datefield'
        },{
            fieldLabel: '开放日',
            name: 'open_date',
            bind: '{data.open_date}',
            xtype: 'datefield'
        }]
    }
});