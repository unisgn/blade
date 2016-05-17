/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.dutyChain.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Tag',
        'Ext.form.field.TextArea',
        'Finetrust.model.Duty'
    ],

    controller: 'entity-detail',

    bind: {
        title: '审批链 - {data.name}'
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
        }, {
            fieldLabel: 'Members',
            name: 'member_csv',
            xtype: 'tagfield',
            store: {
                model: 'Finetrust.model.Duty',
                autoLoad: true
            },
            valueField: 'id',
            displayField: 'name',
            // bind: '{data.member_csv}'
        },{
            fieldLabel: 'member_csv',
            name: 'member_csv_2',
            bind: '{data.member_csv}'
        }]
    }

});