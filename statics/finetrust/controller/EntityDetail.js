/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.controller.EntityDetail', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entity-detail',

    on_btn_reset: function () {
        var me = this;
        var vm = me.getViewModel();
        vm.setLinks(vm.getInitialConfig().links);
    },

    on_btn_save: function () {
        var me = this, view = me.getView(), data = view.getViewModel().getData().data;
        view.setLoading(true);
        data.save({
            callback: function (record, op, success) {
                view.setLoading(false);
            }
        });
    },


    on_btn_save_and_new: function () {

        var me = this, view = me.getView(), vm = me.getViewModel(), data = vm.getData().data, initLinks = vm.getInitialConfig();
        view.setLoading(true);
        data.save({
            callback: function (record, op, success) {
                view.setLoading(false);

                var links = {
                    data: {
                        type: initLinks.links.data.type,
                        create: true
                    }
                };
                vm.setLinks(links);
            }
        });

    }
});