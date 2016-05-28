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
        this.launch_detail(record.getId(), 'readonly');
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
            me.launch_detail(record.getId(), 'readonly');
        }
    },


    on_menu_edit: function () {
        var me = this, view = me.getView(), record = view.getSingleSelection();
        if (record) {
            me.launch_detail(record.getId(), 'update');
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

    on_menu_sync: function () {
        this.getView().getStore().sync();
    },
    /**
     *
     * @param {String|Number|Ext.data.Model} [id] - the model of the record
     * @param {Boolean} [mode] - readonly mode
     */
    launch_detail: function (id, mode) {
        var me = this, view = me.getView(), app = view.getApp();
        if (app) {
            Beaux.launch(app, {
                id: id,
                mode: mode
            });
        } else {
            console.warn('no detailApp found in view');
        }
    },

    launch_query_panel: function () {
        var me = this,
            view = me.getView(),
            qp = view.getQueryPanel();
        if (!qp) {
            qp = view.initQueryPanel();
        }
        qp && qp.show();
    },


    /**
     *
     * @param {Ext.data.Model} record
     */
    remove_entity: function (record) {
        this.getView().getStore().remove(record);
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
    },

    reset_inline_criteria: function () {
        var me = this;
        vm = me.getViewModel();
        data = vm.getData();
        Ext.Object.each(data, function (k, v, o) {
            vm.set(k, undefined);
        });
        this.query_by_inline_criteria();
    },

    request_inline_criteria: function (cmp, e, eOpt) {
        if (e.keyCode === 13) {
            this.query_by_inline_criteria();
        }
    },

    query_by_inline_criteria: function () {
        var me = this, vm = me.getViewModel();
        console.log(vm.getData());
    },
    
    on_beforeclose: function () {
        if (!Ext.Object.isEmpty(this.get_record())) {
            Ext.Msg.alert('');
        }
    }

});