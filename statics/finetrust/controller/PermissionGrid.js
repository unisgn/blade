/**
 * Created by 0xFranCiS on Jun 01, 2016.
 */
Ext.define('Finetrust.controller.PermissionGrid', {
    extend: 'Finetrust.controller.EntityGrid',
    alias: 'controller.permission-grid',

    on_menu_new: function () {
        var me = this, view = me.getView(), app = view.getApp(), rec = view.getSelection()[0];
        if (app) {
            Beaux.launch(app, {
                id: undefined,
                mode: 'create',
                parent_id: rec ? rec.getId() : undefined
            });
        } else {
            console.warn('no detailApp found in view');
        }
    }
});