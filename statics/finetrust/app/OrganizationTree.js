/**
 * Created by 0xFranCiS on May 20, 2016.
 */
Ext.define('Finetrust.app.OrganizationTree', {
    extend: 'Beaux.Application',

    requires: [
        'Beaux.desktop.XWindow',
        'Finetrust.view.organization.Grid'
    ],

    statics: {
        launch: function (cfg) {
            Ext.create('Beaux.desktop.XWindow', {
                title: '机构管理',
                items: Ext.create('Finetrust.view.organization.Grid')
            }).show();
        }
    }
});