/**
 * Created by 0xFranCiS on May 17, 2016.
 */
Ext.define('Finetrust.widget.FileGrid', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.filegrid',

    xtype: 'filegrid',

    layout: 'auto',


    controller: 'file_grid',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Finetrust.controller.FileGrid'
    ],

    config: {
        fkid: undefined,
        readonly: false
    },


    items: {
        xtype: 'grid',
        reference: 'grid',
        minHeight: 120,
        bind: {
            store: '{attachments}'
        },
        tbar: [{
            xtype: 'form',
            reference: 'form',
            items: [{
                xtype: 'filefield',
                name: 'upload_file',
                anchor: '100%',
                buttonText: '选择文件',
                buttonOnly: true,
                listeners: {
                    change: 'on_upload'
                }
            }]
        }],
        itemId: 'file-grid',
        columns: {
            items: [{
                text: '文件名',
                dataIndex: 'fname',
                renderer: function (v, meta, record) {
                    return Ext.String.format('<a href="/download?fid={0}">{1}</a>', record.getId(), v);
                },
                flex: 1
            }, {
                text: '上传时间',
                align: 'center',
                width: 180,
                dataIndex: 'upload_date',
                xtype: 'datecolumn',
                format: 'Y-m-d H:i:s'
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: 'extjs5/share/icons/delete.gif',
                    tooltip: '删除',
                    handler: 'on_remove',
                    scope: 'controller'
                }]
            }]
        }
    },

    initComponent: function () {
        var me = this;

        if (me.readonly) {
            me.items.tbar = undefined;
            me.items.columns.items[2].hidden = true;
        }

        me.callParent();
    }
});