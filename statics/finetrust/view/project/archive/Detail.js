/**
 * Created by 0xFranCiS on May 14, 2016.
 */

Ext.define('Finetrust.view.project.archive.Detail', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Boolean',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel',
        'Ext.util.Format',
        'Finetrust.model.ProjectArchive',
        'Finetrust.model.ProjectSuperviseJournal',
        'Finetrust.widget.FileGrid'
    ],


    height: 640,

    layout: {
        type: 'auto'
    },

    bind: {
        title: '项目归档@{data.name}'
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
                        me.getViewModel().getStore('tran_docs').remove(ctx.record);
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
                bind: '{data.code}'
            }, {
                fieldLabel: '项目名称',
                name: 'project_name',
                bind: '{data.name}'
            }, {
                fieldLabel: '入库编号',
                name: 'trans_num',
                bind: '{data.trans_num}',
                readOnly: false
            }, {
                fieldLabel: '移交人',
                name: 'trans_person',
                bind: '{data.trans_person}',
                readOnly: false
            }]
        }, {
            flex: 1,
            minHeight: 200,
            xtype: 'grid',
            bind: {
                store: '{tran_docs}'
            },
            plugins: editor,
            columns: {
                defaults: {
                    align: 'left'
                },
                items: [{
                    text: '资料明细',
                    flex: 1,
                    dataIndex: 'detail',
                    editor: 'textarea'
                }, {
                    text: '份数',
                    width: 80,
                    dataIndex: 'copies',
                    editor: {
                        xtype: 'numberfield',
                        allowDecimals: false,
                        minValue: 0
                    }
                }, {
                    text: '原件',
                    dataIndex: 'is_copy',
                    width: 80,
                    xtype: 'booleancolumn',
                    trueText: '原件',
                    falseText: '复印件',
                    editor: 'checkbox'
                }, {
                    text: '备注',
                    dataIndex: 'memo',
                    flex: 1,
                    editor: 'textarea'
                }]
            },
            selModel: 'rowmodel',
            tbar: [{
                text: 'Add',
                handler: function () {
                    var store = me.getViewModel().getStore('tran_docs');
                    store.insert(0, Ext.create('Finetrust.model.ProjectArchive'));
                    editor.startEdit(0, 0);
                }
            }, {
                text: 'remove',
                handler: function () {

                    var sel = me.down('grid').getSelection()[0];
                    if (sel) {
                        me.getViewModel().getStore('tran_docs').remove(sel);
                    }
                }
            }]
        },{
            minHeight: 120,
            xtype: 'filegrid',
            bind: {
                fkid: '{data.id}'
            }
        }];

        me.fbar = [{
            text: 'Save',
            handler: function () {
                me.getViewModel().getData('data').data.save();
                me.getViewModel().getStore('tran_docs').sync();
            }
        }];


        me.callParent();
    }
});