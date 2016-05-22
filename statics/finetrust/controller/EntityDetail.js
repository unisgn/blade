/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.controller.EntityDetail', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entity-detail',

    get_record: function () {
        return this.getViewModel().getData().data;
    },

    on_btn_save: function () {
        var me = this,
            view = me.getView(),
            rec = me.get_record();
        if (!Ext.Object.isEmpty(rec.modified)) {
            view.setLoading(true);
            rec.save({
                callback: function () {
                    view.setLoading(false);
                }
            });
        }
    },


    on_btn_save_and_new: function () {
        var me = this,
            view = me.getView(),
            rec = me.get_record();
        if (!Ext.Object.isEmpty(rec.modified)) {
            view.setLoading(true);
            rec.save({
                callback: function () {
                    view.setLoading(false);
                    me.issue_new_record();
                }
            });
        } else {
            me.issue_new_record();
        }
    },

    issue_new_record: function () {
        var me = this,
            vm = me.getViewModel(),
            clz = Ext.getClass(vm.getData().data);
        vm.setData({
            data: new clz()
        });

    },

    on_beforeclose: function () {
        //TODO: unsaved alert
        // if (!Ext.Object.isEmpty(this.get_record())) {
        //     Ext.Msg.alert('');
        // }
    }
});