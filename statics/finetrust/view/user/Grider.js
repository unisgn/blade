/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.user.Grider', {
    extend: 'Beaux.desktop.XWindow',

    layout: 'fit',

    requires: [
        'Ext.layout.container.Fit',
        'Finetrust.controller.UserGrid',
        'Finetrust.model.User',
        'Finetrust.view.EntityGrid',
        'Finetrust.view.user.QueryPanel'
    ],


    items: {
        xtype: 'entity-grid',
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