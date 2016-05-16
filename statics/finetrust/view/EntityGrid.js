/**
 * Created by 0xFranCiS on Mar 23, 2015.
 *
 * create an GRID by the given STORE.
 * input: store, display fields ( and width), filter fields (and group fields)
 * output: the grid (fancy infinite style), and a filter/grouping sub panel
 */
;Ext.define('Finetrust.view.EntityGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'entity-grid',

    requires: [
        'Ext.menu.Menu',
        'Ext.menu.Separator',
        'Ext.util.HashMap',
        'Finetrust.controller.EntityGrid'
    ],

    controller: 'entity-grid',

    listeners: {
        itemcontextmenu: 'on_itemcontextmenu',
        itemdblclick: 'on_itemdblclick',
        containercontextmenu: 'on_containercontextmenu',
        criteriaready: 'on_criteria_ready',
        scope: 'controller' // IMPORTANT
    },


    /**
     * @type {Beaux.desktop.XWindow}
     */


    config: {
        queryPanel: undefined,
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
        
        detailApp: undefined
    },


    initComponent: function () {
        var me = this;

        me.callParent();

        if (me.queryPanel) {
            me.queryPanel.on({
                criteriaready: function () {
                    me.fireEvent('criteriaready');
                    me.queryPanel.hide();
                }
            });
        }

    },

    getSingleSelection: function() {
        var me = this, sel = me.getSelection();
        if (sel.length > 0) {
            return sel[0];
        }
    },


    getItemContextMenu: function () {
        var me = this,
            menuId = 'item',
            menu;
        if (!me.menus.get(menuId)) {
            menu = Ext.create('Ext.menu.Menu', {
                items: [{
                    text: '查看',
                    handler: function () {
                        var sel = me.getSingleSelection();
                        if (sel) {
                            me.getController().launch_detail(sel.getId(), true);
                        }
                    }
                }, {
                    text: '编辑',
                    handler: function () {
                        var sel = me.getSingleSelection();
                        if (sel) {
                            me.getController().launch_detail(sel.getId());
                        }
                    }
                }, {
                    text: '删除',
                    handler: function () {
                        var sel = me.getSingleSelection();
                        if (sel) {
                            Ext.Msg.show({
                                title: 'Sure To Remove?',
                                message: 'you are goting to remove ',
                                buttons: Ext.Msg.OKCANCEL,
                                fn: function (btn) {
                                    if (btn == 'ok') {
                                        me.getController().remove_entity(sel);
                                    }
                                }
                            });
                            
                        }
                    }
                },{
                    xtype: 'menuseparator'
                },{
                    text: '新建',
                    handler: function () {
                        me.getController().launch_detail();
                    }
                }, {
                    text: '刷新',
                    handler: function () {
                        me.getController().refresh_page();
                    }
                }]
            });
            me.menus.add(menu);
        } else {
            menu = me.menus.get(menuId);
        }
        return menu;
    },

    getContainerContextMenu: function () {
        var me = this,
            menuId = 'container',
            menu;
        if (!me.menus.get(menuId)) {
            menu = Ext.create('Ext.menu.Menu', {
                items: [{
                    text: '新建',
                    handler: function () {
                        me.getController().launch_detail();
                    }
                }, {
                    text: '刷新',
                    handler: function () {
                        me.getController().refresh_page();
                    }
                }]
            });
            me.menus.add(menu);
        } else {
            menu = me.menus.get(menuId);
        }
        return menu;
    },

    /**
     * @override
     */
    afterRender: function () {
        var me = this;

        if (me.keymap) {
            me.keymap.addBinding({
                key: 's',
                shift: true,
                handler: function () {
                        me.getController().launch_query_panel();
                    }
            });
        } else {
            me.keymap = Ext.create('Ext.KeyMap', {
                target: me.getEl(),
                binding: [{
                    key: 's',
                    shift: true,
                    handler: function () {
                        me.getController().launch_query_panel();
                    }
                }]
            });
        }

        me.callParent();
    },

    /**
     * @override
     */
    onDestroy: function () {
        var me = this;
        me.keymap && me.keymap.destroy();

        me.menus.each(function (key, val, len) {
            val.destroy();
        });

        me.callParent();
    }

});