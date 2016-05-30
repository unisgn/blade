/**
 * Created by 0xFranCiS on May 14, 2016.
 */

Ext.define('Finetrust.view.project.base.Updator', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.app.ViewModel',
        'Ext.form.CheckboxGroup',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.grid.Panel',
        'Ext.layout.container.Anchor',
        'Finetrust.model.ProjectAgent',
        'Finetrust.view.CellEditGrid',
        'Finetrust.view.OutlineEditGrid',
        'Finetrust.view.OutlineEditor',
        'Finetrust.view.RowEditGrid',
        'Finetrust.view.project.base.ProjectAgent',
        'Finetrust.widget.FileGrid'
    ],

    layout: {
        type: 'anchor',
        reserveScrollbar: true
    },

    scrollable: true,

    width: 800,
    height: 640,

    bind: {
        title: '项目@{data.name}'
    },

    items: [{
        xtype: 'form',
        bodyPadding: 5,
        title: '基本信息',
        defaultType: 'textfield',
        defaults: {
            readOnly: false
        },
        items: [{
            xtype: 'fieldset',
            title: '基本信息',
            defaultType: 'textfield',
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
            }, {
                fieldLabel: 'CreateDate',
                name: 'create_date',
                bind: '{data.create_date}',
                xtype: 'datefield',
                readOnly: true
            }, {
                fieldLabel: '主帐号',
                name: 'main_direction',
                bind: '{data.invest_advisor}'
            }]
        }, {
            xtype: 'checkboxgroup',
            fieldLabel: '产品主要投向',
            columns: 5,
            bind: {
                value: '{main_direction}'
            },
            items: [
                {boxLabel: '二级市场', name: 'main_direction', inputValue: '1'},
                {boxLabel: '信贷资产', name: 'main_direction', inputValue: '2'},
                {boxLabel: '定向增发', name: 'main_direction', inputValue: '3'},
                {boxLabel: '信托受益权', name: 'main_direction', inputValue: '4'},
                {boxLabel: '合伙企业', name: 'main_direction', inputValue: '5'},
                {boxLabel: '银行间市场', name: 'main_direction', inputValue: '6'},
                {boxLabel: '期货', name: 'main_direction', inputValue: '7'},
                {boxLabel: '票据', name: 'main_direction', inputValue: '8'},
                {boxLabel: '其他', name: 'main_direction', inputValue: '9'}
            ]
        }]
    }, {
        xtype: 'cellEditGrid',
        // hidden: true,
        title: '付款帐号',
        bind: {
            store: '{pre_accounts}'
        },
        columns: [{
            text: '帐号',
            flex: 1,
            dataIndex: 'acct_no',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: '户名',
            dataIndex: 'acct_name',
            flex: 1,
            editor: {
                xtype: 'textfield'
            }
        }, {
            text: '主账号?',
            dataIndex: 'is_primary',
            width: 60,
            xtype: 'checkcolumn',
            listeners: {
                'checkchange': function (field, rowIdx) {
                    var store = this.up('grid').getStore();
                    var cur = store.getAt(rowIdx);
                    var cur_id = cur.getId();
                    var vm = this.up('window').getViewModel();
                    var project_id = vm.get('data.id');
                    Ext.Ajax.request({
                        url: '/api/ProjectPreAccount/' + cur_id + '/set_primary',
                        params: {
                            project_id: project_id
                        },
                        method: 'PUT',
                        success: () => {
                            store.each(function (record) {
                                if (record.getId() != cur_id) {
                                    record.set('is_primary', false);
                                }
                            });
                        }
                    });
                }
            }
        }]
    }, {
        xtype: 'outlineEditGrid',
        // hidden: true,
        title: '中介服务商',

        create_editor: () => Ext.create('Finetrust.view.project.base.ProjectAgent'),

        bind: {
            store: '{agents}'
        },
        columns: [{
            text: '公司名',
            dataIndex: 'corp_name',
            flex: 1
        }, {
            text: '法人',
            dataIndex: 'legalman',
            width: 120
        }, {
            text: '电话',
            dataIndex: 'phone',
            width: 180
        }, {
            text: '联系人',
            dataIndex: 'contact',
            width: 120
        }]
    }, {
        xtype: 'filegrid',
        title: '项目附件',
        minHeight: 180,
        bind: {
            fkid: '{data.id}'
        }
    }],


    initReadonly: function () {
        var me = this;
        if (me.getMode() === 'readonly') {
            me.items[0].defaults = {
                readOnly: true
            };
            me.items[1].readonly = true;
            me.items[2].readonly = true;
            me.items[3].readonly = true;
        }

        me.callParent();
    }
});