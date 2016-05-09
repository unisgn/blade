/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.user.Detail', {
    extend: 'Beaux.desktop.XWindow',

    requires: ['Finetrust.controller.User'],

    controller: 'user',

    readonly: false,

    viewModel: Ext.create('Ext.app.ViewModel', {
        data: Ext.create('Finetrust.model.User')
    }),

    bind: {
        title: '{username}'
    },

    items: {
        xtype: 'form',
        defaultType: 'textfield',
        defaults: {
            readOnly: false
        },
        items: [{
            fieldLabel: 'username',
            name: 'username',
            bind: '{username}'
        }]
    },

    initComponent: function () {
        var me = this;
        if (!me.readonly) {
            me.fbar = ['->', {
                type: 'button',
                text: 'RESET'
            }, {
                type: 'button',
                text: 'SAVE',
                listeners: {
                    click: 'on_save'
                }
            }, {
                type: 'button',
                text: 'SAVE&NEW'
            }];
        }
        me.items['defaults']['readOnly'] = me.readonly;
        me.callParent();
    },

    beforeclose: function () {
        //TODO: unsaved alert implement
        this.callParent();
    }
});