/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.user.Detail', {
    extend: 'Finetrust.view.ModelDetail',

    requires: [
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