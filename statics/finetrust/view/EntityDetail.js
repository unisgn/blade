/**
 * Created by 0xFranCiS on Mar 23, 2015.
 *
 * create an ENTITY DETAIL CARD by the given RECORD/MODEL ( alone with its STORE, for auto sync.)
 * input: record(store).
 * output: entity detail card frame.
 * the detail card layout (as it is difficult to auto layout the fields) should be implemented by concrete entity
 */
;
Ext.define('Finetrust.view.EntityDetail', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.button.Button',
        'Finetrust.controller.EntityDetail'
    ],

    controller: 'entity-detail',



    i18n: {
        btn_reset: 'RESET',
        btn_save: 'SAVE',
        btn_save_and_new: 'SAVE & NEW',
        msg_failure: 'FAILED: '
    },

    config: {
        readonly: false
    },



    initComponent: function () {
        var me = this,
            readonly = !!me.readonly;
        if (!readonly) {
            me.fbar = [
                '->',
                {
                    xtype: 'button',
                    text: me.i18n.btn_reset,
                    handler: 'on_btn_reset'
                }, {
                    xtype: 'button',
                    text: me.i18n.btn_save,
                    handler: 'on_btn_save'
                }, {
                    xtype: 'button',
                    text: me.i18n.btn_save_and_new,
                    handler: 'on_btn_save_and_new'
                }
            ];

        }
        if (me.items) {
                if (me.items.defaults) {
                    me.items.defaults.readOnly = readonly;
                } else {
                    me.items.defaults = {
                        readOnly: readonly
                    };
                }
        }
        
        me.callParent();

    },

    beforeclose: function () {
        //TODO: unsaved alert implement
        this.callParent();
    }
});
