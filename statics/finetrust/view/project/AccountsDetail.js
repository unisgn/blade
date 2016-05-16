/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.AccountsDetail', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.Store',
        'Finetrust.app.ProjectAccountItemDetail',
        'Finetrust.model.ProjectAccount',
        'Finetrust.view.EntityGrid'
    ],

    bind: {
        title: '账户明细@{data.name}'
    },
    
    config: {
        restUrl: undefined
    },
    
    initComponent: function () {
        var me = this,
            url = me.restUrl;
        
        me.items = Ext.create('Finetrust.view.EntityGrid', {
            detailApp: 'Finetrust.app.ProjectAccountItemDetail',
            store: Ext.create('Ext.data.Store', {
                model: 'Finetrust.model.ProjectAccount',
                autoLoad: true
            }),
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
            }]
        });

        me.callParent();
    }
});