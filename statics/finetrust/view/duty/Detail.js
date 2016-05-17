/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.duty.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Finetrust.model.Duty'
    ],

    controller: 'entity-detail',
    
    bind: {
        title: '{data.name}'
    },
    

    items: {
        xtype: 'form',
        defaultType: 'textfield',
        defaults: {
            readOnly: false
        },
        items: [{
            fieldLabel: 'code',
            name: 'code',
            bind: '{data.code}'
        }, {
            fieldLabel: 'name',
            name: 'name',
            bind: '{data.name}'
        }, {
            fieldLabel: 'brief',
            name: 'brief',
            bind: '{data.brief}',
            xtype: 'textarea'
        
        }]
    }
    
});