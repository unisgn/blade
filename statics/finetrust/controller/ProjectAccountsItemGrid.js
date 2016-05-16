/**
 * Created by 0xFranCiS on May 16, 2016.
 */
Ext.define('Finetrust.controller.ProjectAccountsItemGrid', {
    extend: 'Finetrust.controller.EntityGrid',
    
    alias: 'controller.project-accounts-item-grid',

    launch_detail: function (model, readonly) {
        var me = this, view = me.getView(), detailApp = view.getDetailApp(), store;
        if (detailApp) {
            if (!model) {
                store = me.getViewModel().getStore('accounts');
                var clz = store.getModel();
                model = store.add(new clz())[0];
            }
            Beaux.launch(detailApp, {
                model: model,
                readonly: false
            });
        }

    },

    remove_entity: function(record) {
        var store = this.getViewModel().getStore('accounts');
        store.remove(record);
        store.sync();
    }


});