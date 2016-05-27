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
        title: '岗位@{data.name}'
    },
    

    items: {
        xtype: 'form',
        bodyPadding: 5,
        defaultType: 'textfield',
        defaults: {
            readOnly: false
        },
        items: [{
            fieldLabel: '编号',
            name: 'code',
            bind: '{data.code}'
        }, {
            fieldLabel: '名称',
            name: 'name',
            bind: '{data.name}'
        }, {
            fieldLabel: '说明',
            name: 'brief',
            bind: '{data.brief}',
            xtype: 'textarea'
        
        }]
    }
    
});