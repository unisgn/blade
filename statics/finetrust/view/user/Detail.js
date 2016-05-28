/**
 * Created by 0xFranCiS on May 09, 2016.
 */
Ext.define('Finetrust.view.user.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel'
    ],

    controller: 'entity-detail',
    
    bind: {
        title: '用户@{data.username}'
    },
    

    items: {
        xtype: 'form',
        bodyPadding: 5,
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
            readOnly: me.getMode() === 'readonly'
        };
        
        me.callParent(arguments);
    }
    
    
});