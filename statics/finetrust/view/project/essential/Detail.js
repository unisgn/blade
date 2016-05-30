/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.essential.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Display'
    ],

    bind: {
        title: '市场要素@{data.name}'
    },

    items: {
        xtype: 'form',
        bodyPadding:5,
        defaultType: 'textfield',
        defaults: {
            readOnly: false
        },
        items: [{
            fieldLabel: '项目编号',
            name: 'number',
            bind: '{data.number}',
            xtype: 'displayfield'
        }, {
            fieldLabel: '项目名称',
            name: 'code',
            bind: '{data.name}',
            readOnly: true
        }, {
            fieldLabel: '成立日期',
            name: 'setup_date',
            bind: '{data.setup_date}',
            xtype: 'datefield'
        },{
            fieldLabel: '合同编号',
            name: 'contract_no',
            bind: '{data.contract_no}',
            readOnly: true
        },{
            fieldLabel: '合同状态',
            name: 'contract_status',
            xtype: 'combobox',
            store: Finetrust.data.Dict.dictstore('contract_status'),
            valueField: 'value',
            displayField: 'text',
            bind: '{data.contract_status}'
        }]
    }
});