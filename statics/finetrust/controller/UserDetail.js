/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.controller.UserDetail', {
    extend: 'Finetrust.controller.DetailController',
    alias: 'controller.user-detail',

    on_btn_save: function () {
        this.callParent();
    }
});