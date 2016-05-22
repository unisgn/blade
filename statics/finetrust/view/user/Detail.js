/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.user.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Finetrust.controller.UserDetail',
        'Finetrust.model.User'
    ],

    controller: 'user-detail',
    
    bind: {
        title: '{data.username}'
    },
    

    items: {
        xtype: 'form',
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'username',
            name: 'username',
            bind: '{data.username}'
        }, {
            fieldLabel: 'password',
            name: 'password',
            bind: '{data.password}'
        }, {
            fieldLabel: 'LastMod',
            name: 'last_modified_date',
            bind: '{data.last_modified_date}'
        }]
    },

    initReadonly: function () {
        var me = this;
        me.items.defaults = {
            readOnly: me.getReadonly()
        };
        
        me.callParent(arguments);
    }
    
    
});