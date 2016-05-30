/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.supervise.Detail', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Boolean',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel',
        'Finetrust.model.ProjectSuperviseIssue'
    ],

    height: 520,

    layout: {
        type: 'auto'
    },

    bind: {
        title: '监督事项@{data.name}'
    },

    config: {
        readonly: false
    },

    initComponent: function (args) {
        var me = this, editor = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            listeners: {
                cancelEdit: function (e, ctx) {
                    if (ctx.record.phantom) {
                        me.getViewModel().getStore('issues').remove(ctx.record);
                    }
                }
            }
        });
        me.items = [{
            xtype: 'form',
            defaultType: 'textfield',
            defaults: {
                readOnly: me.readonly
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
        }, {
            flex: 1,
            minHeight: 200,
            xtype: 'grid',
            bind: {
                store: '{issues}'
            },
            plugins: editor,
            columns: {
                defaults: {
                    align: 'center'
                },
                items: [{
                    text: '监督内容',
                    width: 100,
                    dataIndex: 'issue_type',
                    renderer: function (v) {
                        var v = Finetrust.data.Dict.keyset('supervise_type')[v];
                        return v ? v.text : '';
                    },
                    editor: {
                        xtype: 'combobox',
                        store: {
                            fields: ['key', 'text'],
                            data: Finetrust.data.Dict.keyset('supervise_type')
                        },
                        valueField: 'key',
                        displayField: 'text'
                    }
                }, {
                    text: '人工监控',
                    width: 80,
                    dataIndex: 'artificial',
                    xtype: 'booleancolumn',
                    trueText: '是',
                    falseText: '否',
                    editor: {
                        xtype: 'checkbox'
                    }
                }, {
                    flex: 1,
                    align: 'left',
                    text: '监督事项',
                    dataIndex: 'content',
                    editor: {
                        xtype: 'textarea'
                    }
                }]
            },
            selModel: 'rowmodel',
            tbar: [{
                text: 'Add',
                handler: function () {
                    var store = me.getViewModel().getStore('issues');
                    store.insert(0, Ext.create('Finetrust.model.ProjectSuperviseIssue'));
                    editor.startEdit(0, 0);
                }
            }, {
                text: 'remove',
                handler: function () {

                    var sel = me.down('grid').getSelection()[0];
                    if (sel) {
                        me.getViewModel().getStore('issues').remove(sel);
                    }
                }
            }]
        }];

        me.fbar = [{
            text: 'Save',
            handler: function () {
                me.getViewModel().getStore('issues').sync();
            }
        }];


        me.callParent();
    }
});