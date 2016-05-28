/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.view.user.Grider', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.view.user.Grid'
    ],


    title: '用户管理',

    items: {
        xtype: 'user-grid',
        app: 'Finetrust.app.User'
    }

});