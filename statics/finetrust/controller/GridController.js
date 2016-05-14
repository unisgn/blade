/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.controller.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-controller',
    

    // init: function () {
    //     var users = [
    //         {id: 1, username: 'fran', password: '0010'},
    //         {id:2, username: 'jane', password: '0010'},
    //         {id:3,username: 'kane', password: '0010'},
    //         {id:4,username: 'peter', password: '0010'}
    //     ];
    //     this.getView().getStore().add(users);
    //     // console.log(this);
    // },


    on_itemcontextmenu: function (dom, record, item, idx, e) {
        var view = this.getView();
        e.stopEvent();
        view.getItemContextMenu().showAt(e.getXY());
        return false;
    },
   

    on_itemdblclick: function (dom, record, item, idx, e) {
        e.stopEvent();
        this.launch_detail(record.getId(), true);
        return false;
    },

    on_containercontextmenu: function (dom, e) {
        var view = this.getView();
        e.stopEvent();
        view.getContainerContextMenu().showAt(e.getXY());
        return false;
    },
    

    // implemented by subclass
    launch_detail: function (id, readonly) {
        var me = this, view = me.getView(), detailApp = view.getDetailApp();
        if (detailApp) {
            Beaux.launch(detailApp, {
                id: id,
                readonly: readonly
            });
        }
        
    },

    launch_query_panel: function () {
        var p = this.getView().getQueryPanel();
        p.show && p.show();
    },
    
    remove_entity: function(record) {
        var me = this;
        record.erase({
            callback: function () {
                me.getView().getStore().reload();
            }
        });
    },

    on_criteria_ready: function () {
        var me = this, view = me.getView(), store = view.getStore(), filters = view.getQueryPanel().getFilters();
        store.clearFilter(true);

        if (filters.length > 0) {
            store.setFilters(filters);
        } else {
            store.reload();
        }
        // store.reload(); // already auto loaded
        
    },
    
    refresh_page: function () {
        this.getView().getStore().reload();
    }

});