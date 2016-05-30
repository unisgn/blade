/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.operators.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Finetrust.model.Project'
    ],

    bind: {
        title: '权限分配@{data.name}'
    },

    items: {
        xtype: 'form',
        defaultType: 'textfield',
        bodyPadding: 5,
        items: [{
            fieldLabel: '项目编号',
            name: 'number',
            xtype: 'displayfield',
            bind: '{data.number}'
        }, {
            fieldLabel: 'Code',
            name: 'code',
            xtype: 'displayfield',
            bind: '{data.code}'
        }, {
            fieldLabel: '项目名称',
            name: 'name',
            xtype: 'displayfield',
            bind: '{data.name}'
        }, {
            fieldLabel: '帐套',
            name: 'acct_num',
            bind: '{data.acct_num}'
        }, {
            fieldLabel: '资产代码',
            name: 'asset_code',
            bind: '{data.asset_code}'
        }, {
            fieldLabel: '经办人',
            name: 'clerks_operator',
            xtype: 'tagfield',
            store: Finetrust.data.Dict.dictstore('user'),
            queryMode: 'local',
            anyMatch: true,
            valueField: 'value',
            displayField: 'text',
            bind: '{data.clerks_operator}'
        }, {
            fieldLabel: '复核人',
            name: 'clerks_operator',
            xtype: 'tagfield',
            store: Finetrust.data.Dict.dictstore('user'),
            queryMode: 'local',
            anyMatch: true,
            valueField: 'value',
            displayField: 'text',
            bind: '{data.clerks_checker}'
        }, {
            fieldLabel: '主管',
            name: 'clerks_operator',
            xtype: 'tagfield',
            store: Finetrust.data.Dict.dictstore('user'),
            queryMode: 'local',
            anyMatch: true,
            valueField: 'value',
            displayField: 'text',
            bind: '{data.clerks_director}'
        }]
    }
});