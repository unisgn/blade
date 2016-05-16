/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.SuperviseDetail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.data.Store',
        'Ext.form.Panel',
        'Finetrust.model.ProjectSuperviseIssue',
        'Finetrust.view.EntityGrid'
    ],

    bind: {
        title: '监督事项@{data.name}'
    },

    initComponent: function (args) {
        var me = this;
        me.items = [{
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
                fieldLabel: 'acct_no',
                name: 'acct_no',
                bind: '{data.acct_no}'
            }, {
                fieldLabel: 'asset_code',
                name: 'asset_code',
                bind: '{data.asset_code}'
            }]
        }, Ext.create('Finetrust.view.EntityGrid', {
            detailApp: 'Finetrust.app.ProjectSuperviseIssueDetail',
            store: Ext.create('Ext.data.Store', {
                model: 'Finetrust.model.ProjectSuperviseIssue',
                autoLoad: true
            }),
            columns: [{
                text: '帐号',
                dataIndex: 'content'
            }, {
                text: '类型',
                dataIndex: 'issue_type'
            }, {
                text: '是否人工监控',
                dataIndex: 'artificial'
            }]
        })
        ];

        me.callParent(args);
    }
});