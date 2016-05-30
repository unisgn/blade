/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.view.OutlineEditGrid', {
    extend: 'Finetrust.view.InlineEditGrid',
    
    xtype: 'outlineEditGrid',

    active_record: undefined,
    editor: undefined,
    
    selModel: {
        mode: 'SINGLE'  
    },


    afterRender: function () {
        var me = this;

        me.callParent();

        me.on({
            itemdblclick: 'on_itemdblclick',
            scope: me
        });
    },


    create_editor: function () {

    },

    get_editor: function () {
        var me = this;
        if (!me.editor) {
            me.editor = me.create_editor();
            if (me.editor && !me.getReadonly()) {
                me.editor.on({
                endEdit: 'onEditEnd',
                close: 'onEditorClose',
                scope: me
            });
            }
        }
        return me.editor;
    },


    create_itemcontextmenu: function () {
        var me = this;
        return Ext.create('Ext.menu.Menu', {
            items: [{
                text: '编辑',
                handler: 'on_menu_edit',
                scope: me
            }, {
                text: '删除',
                handler: 'on_menu_delete',
                scope: me
            }, {
                xtype: 'menuseparator'
            }, {
                text: '新建',
                handler: 'on_menu_create',
                scope: me
            }, {
                text: '刷新',
                handler: 'on_menu_refresh',
                scope: me
            }, {
                text: '同步',
                handler: 'on_menu_sync',
                scope: me
            }]
        });
    },

    on_itemdblclick: function (cmp, record, item, idx, e) {
        var me = this, editor = me.get_editor();
        if (editor) {
            me.active_record = record;
            if (!me.getReadonly()) {
                me.active_record.beginEdit();
            }
            editor.getViewModel().set('data', me.active_record);
            editor.show();
        }
    },

    on_menu_create: function () {
        var me = this, model = me.getStore().getModel(), editor = me.get_editor();
        if (editor) {
            me.active_record = new model();
            editor.getViewModel().set('data', me.active_record);
            editor.show();
        }
    },

    on_menu_edit: function () {
        var me = this, rec=me.getSelection()[0], editor = me.get_editor();
        if (rec && editor) {
            me.active_record = rec;
            me.active_record.beginEdit();
            editor.getViewModel().set('data', me.active_record);
            editor.show();
        }
    },


    onEditEnd: function () {
        var me = this, rec = me.active_record;
        if (!me.getReadonly()) {
            if (rec.phantom) {
                me.getStore().add(rec);
            } else {
                rec.endEdit();
            }
        }
        me.editor.getViewModel().set('data', {});
        me.active_record = undefined;
    },

    onEditorClose: function () {
        var me = this, rec = me.active_record;
        if (!me.getReadonly()) {
            if (rec) {
                rec.cancelEdit();
            }
            me.editor.getViewModel().set('data', {});
            me.active_record = undefined;
        }

    },

    onDestroy: function () {
        var me = this;

        if (me.editor) {
            Ext.destroy(me.editor);
        }

        me.callParent(arguments);
    }


});