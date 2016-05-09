/**
 * Created by 0xFranCiS on Mar 23, 2015.
 *
 * create an ENTITY DETAIL CARD by the given RECORD/MODEL ( alone with its STORE, for auto sync.)
 * input: record(store).
 * output: entity detail card frame.
 * the detail card layout (as it is difficult to auto layout the fields) should be implemented by concrete entity
 */
;
Ext.define('Finetrust.view.ModelViewer', {
    extend: 'Beaux.desktop.XWindow',

    layout: 'fit',


    i18n: {
        btn_reset: 'RESET',
        btn_save: 'SAVE',
        btn_save_and_new: 'SAVE & NEW',
        msg_failure: 'FAILED: '
    },

    readonly: false,

    MODE_CREATE: 'create',
    MODE_READ: 'read',
    MODE_UPDATE: 'update',

    constructor: function (cfg) {

        var me = this;

        Ext.apply(me, cfg || {});
        if (!!me.readonly) {
            me.fbar = [{
                
            }]
        }
        me.callParent(cfg);

    },

    initComponent: function () {
        var me = this,
            readonly = !!me.readonly;
        me.formPanel = me.buildFormPanel();
        me.items = [me.formPanel];
        if (!readonly) {
            me.dockedItems = [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: {
                    minWidth: 80
                },
                items: [
                    '->',
                    {
                        xtype: 'button',
                        text: me.i18n.btn_reset,
                        handler: me.handle_btn_reset,
                        scope: me
                    }, {
                        xtype: 'button',
                        text: me.i18n.btn_save,
                        handler: me.handle_btn_save,
                        scope: me
                    }, {
                        xtype: 'button',
                        text: me.i18n.btn_save_and_new,
                        handler: me.handle_btn_save_and_new,
                        scope: me
                    }
                ]
            }];
        }
        me.callParent();

        if (readonly) {
            me.on({
                afterrender: function () {
                    var fields = me.formPanel.getForm().getFields();
                    fields && fields.each(function (item) {
                        item.setClickToEdit && item.setClickToEdit(false);
                        item.setReadOnly && item.setReadOnly(readonly);
                    });
                },
                scope: me
            });

        }
        me.formPanel.getForm().loadRecord(me.record);
    },

    /**
     * @interface
     */
    buildFormPanel: Ext.emptyFn,

    reset: function () {
        this.formPanel.getForm().reset();
    },

    handle_btn_reset: function () {
        this.reset();
    },
    handle_btn_save: function () {
        var me = this;
        var success = function () {
            me.setTitle(me.title + '#' + me.record.getId());
        };
        me.save(success);
    },

    handle_btn_new: function () {
        var me = this;
        if (me.record.store) {
            me.record = me.record.store.add(Ext.create(me.model))[0];
        } else {
            me.record = Ext.create(me.model);
        }
        me.formPanel.getForm().loadRecord(me.record);
        me.setTitle(me.edit_indicator + title);
    },

    handle_btn_save_and_new: function () {
        this.save(this.handle_btn_new);
    },

    /**
     *
     * @param {Function} [success]
     * @param {Function} [callback]
     */
    save: function (success, callback) {
        var me = this;
        me.formPanel.getForm().updateRecord();
        me.setLoading(true);
        me.record.save({
            scope: me,
            failure: function (record, op) {
                // op.getError() function propertly only
                // when model's proxy's reader messageProperty is set
                Ext.Msg.alert(me.i18n.msg_failure, op.getMessage());
            },
            success: function (record, op) {
                me.record = record;
                success && success(record, op);
            },
            callback: function (record, op) {
                callback && callback(record, op);
                me.setLoading(false);
            }
        });
    }
});
