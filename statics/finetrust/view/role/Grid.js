/**
 * Created by 0xFranCiS on May 30, 2016.
 */
Ext.define('Finetrust.view.role.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.view.role.Grider'
    ],

    title: '角色管理',

    items: {
        xtype: 'role-grid'
    }
});