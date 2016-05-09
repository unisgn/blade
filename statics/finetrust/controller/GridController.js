/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.controller.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridcontroller',


    /**
     * stores all the context menu
     * and remember to destroy all the menus after the component is destroyed
     * @type {Ext.util.HashMap}
     */
    menus: Ext.create('Ext.util.HashMap'),

    /**
     * create an {@link Ext.KeyMap} for this component
     * just one KeyMap instance is enough
     * init the keymap in initComponent method will failed, reason unknown.
     * so just init the keymap after the component is rendered
     * and if you pass the component Object to the KeyMap's target will also fail,
     * so just pass the el (obtained by the return of getEl())
     * or id (obtained by the return of getId()) of the component
     * to the KeyMap's target
     * and remember to destroy the keymap after the component is destroyed.
     * @type {Ext.KeyMap}
     */
    keymap: undefined,

    init: function () {
        var users = [
            {id: 1, username: 'fran', password: '0010'},
            {id:2, username: 'jane', password: '0010'},
            {id:3,username: 'kane', password: '0010'},
            {id:4,username: 'peter', password: '0010'}
        ];
        this.getView().getStore().add(users);
        // console.log(this);
    },


    on_itemcontextmenu: function (dom, record, item, idx, e) {
        var me = this,
            menuId = 'item',
            menu;
        if (!me.menus.get(menuId)) {
            menu = Ext.create('Ext.menu.Menu', {
                items: [{
                    text: '新建',
                    handler: function () {
                        me.launch_entity_detail();
                    }
                }, {
                    text: '查看',
                    handler: function () {
                        me.launch_entity_detail({
                            readonly: true,
                            viewModel: record
                        });
                    }
                }, {
                    text: '编辑',
                    handler: function () {
                        me.launch_entity_detail({
                            viewModel: record
                        });
                    }
                }, {
                    text: '删除',
                    handler: function () {
                        record.drop(); //
                    }
                }]
            });
            me.menus.add(menu);
        } else {
            menu = me.menus.get(menuId);
        }
        menu.showAt(e.getXY());
    },

    on_itemdblclick: function (dom, record) {
        this.launch_entity_detail(record);
    },

    on_containercontextmenu: function (dom, e) {
        var me = this,
            menuId = 'container',
            menu;
        if (!me.menus.get(menuId)) {
            menu = Ext.create('Ext.menu.Menu', {
                items:[{
                    text:'新建',
                    handler: function () {
                        me.launch_entity_detail();
                    }
                }]
            });
            me.menus.add(menu);
        } else {
            menu = me.menus.get(menuId);
        }
        menu.showAt(e.getXY());
    },

    on_afterrender: function () {
        var me = this, view = me.getView();

        if (view.queryPanel) {
            if (me.keymap) {
                me.keymap.addBinding({
                    key: 's',
                    shift: true,
                    handler: me.launch_query_panel,
                    scope: me
                });
            } else {
                me.keymap = Ext.create('Ext.KeyMap', {
                    target: view.getEl(),
                    binding: [{
                        key: 's',
                        shift: true,
                        handler: me.launch_query_panel,
                        scope: me
                    }]
                });
            }
        }
    },

    destroy: function () {
        var me = this;
        me.keymap && me.keymap.destroy();

        me.menus.each(function (key, val, len) {
            val.destroy();
        });

        me.callParent();

    },

    launch_entity_detail: function (cfg) {

    },

    launch_query_panel: function () {
        this.getView().queryPanel.show();
    },

    on_criteria_ready: function () {
        var me = this, view = me.getView(),data=view.getQueryPanel().getViewModel().data;
        console.log(data);
    }

});