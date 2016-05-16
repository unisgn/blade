/**
 * Created by 0xFranCiS on May 14, 2016.
 */

Ext.define('Finetrust.view.project.BasicDetail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Date'
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
            bind: '{data.number}'
        }, {
            fieldLabel: 'Code',
            name: 'code',
            bind: '{data.code}'
        }, {
            fieldLabel: 'Name',
            name: 'name',
            bind: '{data.name}'
        },{
            fieldLabel: 'CreateDate',
            name: 'create_date',
            bind: '{data.create_date}',
            xtype: 'datefield'
        }]
    }
});