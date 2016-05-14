/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.user.Grider', {
    extend: 'Beaux.desktop.XWindow',

    layout: 'fit',

    requires: [
        'Finetrust.view.ModelGrider',
        'Finetrust.model.User',
        'Finetrust.controller.UserGrid'
    ],



    items: {
        xtype: 'model-grid',
        queryPanel: Ext.create('Finetrust.view.user.QueryPanel'),
        controller: 'user-grid',
        store: {
            model: 'Finetrust.model.User',
            autoLoad: true,
            remoteFilter: true
        },
        columns: [{
            text: 'Username',
            dataIndex: 'username'
        }, {
            text: 'Password',
            dataIndex: 'password'
        }]
    }

});