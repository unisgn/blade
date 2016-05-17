/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.controller.ProjectAccountsGrid', {
    extend: 'Finetrust.controller.EntityGrid',
    alias: 'controller.project-sub-grid',


    on_menu_new: function () {
        var me = this, view = me.getView(), record = view.getSingleSelection();
        if (record) {
            this.launch_detail(record);
        } else {
            Ext.Msg.alert('None Item Selected. Choose one first.');
        }
    }



});