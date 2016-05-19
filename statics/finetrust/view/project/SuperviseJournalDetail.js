/**
 * Created by 0xFranCiS on May 14, 2016.
 */

Ext.define('Finetrust.view.project.SuperviseJournalDetail', {
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
        'Ext.util.Format',
        'Finetrust.model.ProjectSuperviseIssue',
        'Finetrust.model.ProjectSuperviseJournal'
    ],

    height: 520,

    layout: {
        type: 'auto'
    },

    bind: {
        title: '手工监督事项'
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
                        me.getViewModel().getStore('journals').remove(ctx.record);
                    }
                }
            }
        });
        me.items = [{
            xtype: 'form',
            defaultType: 'textfield',
            defaults: {
                readOnly: true
            },
            items: [{
                fieldLabel: '项目编号',
                name: 'project_code',
                bind: '{data.project.code}'
            }, {
                fieldLabel: '项目名称',
                name: 'project_name',
                bind: '{data.project.name}'
            }, {
                fieldLabel: '监督类型',
                name: 'issue_type',
                bind: '{data.issue_type}',
                xtype: 'combobox',
                store: {
                    fields: ['key', 'text'],
                    data: Finetrust.data.Dict.keyset('supervise_type')
                },
                valueField: 'key',
                displayField: 'text'
            }, {
                fieldLabel: '监督内容',
                name: 'content',
                bind: '{data.content}'
            }]
        }, {
            flex: 1,
            minHeight: 200,
            xtype: 'grid',
            bind: {
                store: '{journals}'
            },
            plugins: editor,
            columns: {
                defaults: {
                    align: 'left'
                },
                items: [{
                    text: '记录时间',
                    width: 100,
                    dataIndex: 'jnl_date',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: 'datefield'
                }, {
                    text: '主题',
                    flex: 1,
                    dataIndex: 'content',
                    editor: {
                        xtype: 'textarea'
                    }
                }, {
                    flex: 1,
                    text: '备注',
                    dataIndex: 'memo',
                    editor: {
                        xtype: 'textarea'
                    }
                }]
            },
            selModel: 'rowmodel',
            tbar: [{
                text: 'Add',
                handler: function () {
                    var store = me.getViewModel().getStore('journals');
                    store.insert(0, Ext.create('Finetrust.model.ProjectSuperviseJournal'));
                    editor.startEdit(0, 0);
                }
            }, {
                text: 'remove',
                handler: function () {

                    var sel = me.down('grid').getSelection()[0];
                    if (sel) {
                        me.getViewModel().getStore('journals').remove(sel);
                    }
                }
            }]
        }];

        me.fbar = [{
            text: 'Save',
            handler: function () {
                me.getViewModel().getStore('journals').sync();
            }
        }];


        me.callParent();
    }
});