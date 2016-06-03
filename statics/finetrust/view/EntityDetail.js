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
        'Ext.toolbar.Fill',
        'Finetrust.controller.EntityDetail'
    ],

    controller: 'entity-detail',
    
    MODE_READONLY: 'readonly',
    MODE_UPDATE: 'update',
    MODE_CREATE: 'create',

    config: {
        mode: 'readonly',
        app: undefined
    },
    
    listeners: {
        beforeclose: 'on_beforeclose',
        scope: 'controller'
    },

    fbar: {
        items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    handler: 'on_btn_save'
                }, {
                    xtype: 'button',
                    text: 'Save & New',
                    handler: 'on_btn_save_and_new'
                }
            ]
    },
    
    initComponent: function () {
        var me = this;
        me.initReadonly();
        me.callParent(arguments);
    },
    
    initReadonly: function () {
        var me = this;
        if (me.getMode() === 'readonly') {
            me.fbar = undefined;
        }
    },
    
    initUpdateMode: function() {
        
    }
    
});
