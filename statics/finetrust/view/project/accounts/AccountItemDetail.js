/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.AccountItemDetail', {
    extend: 'Beaux.desktop.XWindow',

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
            fieldLabel: '帐号',
            name: 'acct_no',
            bind: '{data.acct_no}'
        }, {
            fieldLabel: '户名',
            name: 'acct_name}',
            bind: '{data.acct_name}'
        }, {
            fieldLabel: '类型',
            name: 'acct_type',
            bind: '{data.acct_type}'
        }, {
            fieldLabel: '开户日期',
            name: 'open_date',
            bind: '{data.open_date}',
            xtype: 'datefield'
        },{
            fieldLabel: '销户日期',
            name: 'close_date',
            bind: '{data.close_date}',
            xtype: 'datefield'
        }]
    }
});