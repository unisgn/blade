/**
 * Created by 0xFranCiS on Mar 23, 2015.
 *
 * create an ENTITY DETAIL CARD by the given RECORD/MODEL ( alone with its STORE, for auto sync.)
 * input: record(store).
 * output: entity detail card frame.
 * the detail card layout (as it is difficult to auto layout the fields) should be implemented by concrete entity
 */
;
Ext.define('Finetrust.view.InstantEntityDetail', {
    extend: 'Beaux.desktop.XWindow',


    config: {
        readonly: false
    },

    initComponent: function () {
        var me = this;
        me.initReadonly();
        me.callParent(arguments);

        me.on({
            afterrender: function () {
                if (!me.getReadonly()) {
                    me.getViewModel().getData().data.beginEdit();
                }
            }
        });
    },

    initReadonly: function () {

    }

});
