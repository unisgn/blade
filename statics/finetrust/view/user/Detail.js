/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.user.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Finetrust.controller.UserDetail'
    ],

    controller: 'user-detail',
    
    bind: {
        title: '{data.username}'
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
            bind: '{data.username}'
        },{
            fieldLabel: 'password',
            name: 'password',
            bind: '{data.password}'
        }]
    }
    
});