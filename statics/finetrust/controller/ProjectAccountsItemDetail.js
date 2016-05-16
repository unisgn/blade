/**
 * Created by 0xFranCiS on May 17, 2016.
 */
Ext.define('Finetrust.controller.ProjectAccountsItemDetail', {
    extend: 'Finetrust.controller.EntityDetail',

    alias: 'controller.project-accounts-item-detail',

    on_btn_save: function () {
        var me = this, view = me.getView(), data = view.getViewModel().getData().data;
        data.commit();
    }


});