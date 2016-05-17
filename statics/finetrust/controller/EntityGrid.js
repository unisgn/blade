/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.controller.EntityGrid', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.entity-grid',
    

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
        var view = this.getView(), readonly = !!view.readonly, menu = view.getItemContextMenu();
        if (menu && !readonly) {
            e.stopEvent();
            menu.showAt(e.getXY());
            return false;
        }
        
    },
   

    on_itemdblclick: function (dom, record, item, idx, e) {
        e.stopEvent();
        this.launch_detail(record, true);
        return false;
    },

    on_containercontextmenu: function (dom, e) {
        var view = this.getView(), readonly = !!view.readonly, menu = view.getContainerContextMenu();
        if (!readonly && menu) {
            e.stopEvent();
            menu.showAt(e.getXY());
            return false;
        }
    },
    
    on_menu_view: function () {
        var me = this, view = me.getView(), record = view.getSingleSelection();
        if (record) {
            me.launch_detail(record, true);
        }
    },

    
    on_menu_edit: function () {
        var me = this, view = me.getView(), record = view.getSingleSelection();
        if (record) {
            me.launch_detail(record, false);
        }
    },
    
    on_menu_new: function () {
        this.launch_detail();
    },
    
    on_menu_remove: function () {
        var me = this, view = me.getView(), record = view.getSingleSelection();
        if (record) {
            me.remove_entity(record);
        }
    },
    
    on_menu_refresh: function () {
        this.refresh_page();
    },
    
    
    
    
    /**
     *
     * @param {String|Number|Ext.data.Model} [model] - the model of the record
     * @param {Boolean} [readonly] - readonly mode
     */
    launch_detail: function (model, readonly) {
        var me = this, view = me.getView(), detailApp = view.getDetailApp();
        if (detailApp) {
            Beaux.launch(detailApp, {
                model: model,
                readonly: readonly
            });
        }
        
    },

    launch_query_panel: function () {
        var p = this.getView().getQueryPanel();
        p && p.show && p.show();
    },


    /**
     * 
     * @param {Ext.data.Model} record
     */
    remove_entity: function(record) {
        var me = this;
        record.erase({
            callback: function () {
                me.getView().getStore().reload();
            }
        });
    },

    on_criteria_ready: function () {
        var me = this, view = me.getView(), store = view.getStore(), filters = view.getQueryPanel().createCriteria();
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