/**
 * Created by 0xFranCiS on May 19, 2016.
 */

Ext.define('Finetrust.controller.FileGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.file-grid',


    on_upload: function () {
        var me = this, view = me.getView(), fkid = view.getFkid();
        var refs = me.getReferences();
        refs.form.submit({
            url: '/upload?fkid=' + fkid,
            waitMsg: 'uploading...',
            success: function (fp, o) {
                refs.grid.getStore().reload();
            }
        })
    },

    on_remove: function (grid, rowIdx) {
        var me = this, refs = me.getReferences();
        refs.grid.getStore().removeAt(rowIdx);
    }
});