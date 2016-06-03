/**
 * Created by 0xFranCiS on May 30, 2016.
 */
Ext.define('Finetrust.view.permission.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    
    
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea'
    ],

    bind: {
        title: '权限@{data.code}'
    },


    items: [{
        xtype: 'form',
        bodyPadding: 5,
        defaultType: 'textfield',
        items: [{
            fieldLabel: '上级目录',
            name: 'parentId',
            xtype: 'combobox',
            store: Finetrust.data.Dict.dictstore('permission_parent'),
            queryMode: 'local',
            anyMatch: true,
            valueField: 'value',
            displayField: 'text',
            bind: '{data.parentId}'
        }, {
            fieldLabel: '代码',
            name: 'code',
            bind: '{data.code}'
        }, {
            fieldLabel: '说明',
            xtype: 'textarea',
            bind: '{data.memo}'
        }]
    }],
    
});