/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.AccountsDetail', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.button.Button',
        'Finetrust.controller.ProjectAccountsItemGrid',
        'Finetrust.view.EntityGrid'
    ],

    bind: {
        title: '账户明细@{data.name}'
    },
    
    
    initComponent: function () {
        var me = this;
        
        me.items = Ext.create('Finetrust.view.EntityGrid', {
            controller: 'project-accounts-item-grid',
            detailApp: 'Finetrust.app.ProjectAccountItemDetail',
            bind: {
                store: '{accounts}'
            },
            columns: [{
                text: '帐号',
                dataIndex: 'acct_no'
            }, {
                text: '类型',
                dataIndex: 'acct_type'
            }, {
                text: '户名',
                dataIndex: 'acct_name'
            }, {
                text: '开户日期',
                dataIndex: 'open_date'
            },{
                text: '销户日期',
                dataIndex: 'close_date'
            }],
            fbar: [{
                xtype: 'button',
                text: 'save',
                handler: function () {
                    me.getViewModel().getStore('accounts').sync();
                }
            }]
        });

        me.callParent();
    }
});