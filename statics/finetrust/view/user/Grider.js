/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.user.Grider', {
    extend: 'Beaux.desktop.XWindow',

    layout: 'fit',

    requires: [
        'Finetrust.view.ModelGrider',
        'Finetrust.model.User'
    ],

    items: {
        xtype: 'model-grid',
        queryPanel: Ext.create('Finetrust.view.user.QueryPanel'),
        store: {
            model: 'Finetrust.model.User'
        },
        columns: [{
            text: 'Username',
            dataIndex: 'username'
        },{
            text: 'Password',
            dataIndex: 'password'
        }]
    }
    
});