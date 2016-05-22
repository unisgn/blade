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
        afterrender: 'on_afterrender',
        destroy: 'on_destroy',
        scope: 'controller' // IMPORTANT
    },

    selModel: {
        mode: 'SINGLE',
        // allowDeselect: true
    },

    viewConfig: {
        stripeRows: true,
        // enableTextSelection: true
    },

    config: {

        /**
         *
         * @type {Beaux.desktop.XWindow}
         */
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


        /**
         * @type {Beaux.Application}
         */
        detailApp: undefined,


        readonly: false
    },

    /**
     * @abstract
     */
    createQueryPanel: function () {

    },

    initQueryPanel: function () {
        var me = this, qp = me.getQueryPanel();
        if (!qp) {
            qp = me.createQueryPanel();
            if (qp) {
                qp.on('criteriaready', me.getController().on_criteria_ready);
                me.setQueryPanel(qp);
            }
        }
        return qp;
    },

    getSingleSelection: function () {
        var me = this, sel = me.getSelection();
        if (sel.length > 0) {
            return sel[0];
        }
    },


    getItemContextMenu: function () {
        var me = this,
            menuId = 'item',
            menu, readonly = !!me.readonly;

        if (!readonly) {
            if (!me.menus.get(menuId)) {
                menu = Ext.create('Ext.menu.Menu', {
                    items: [{
                        text: '查看',
                        handler: 'on_menu_view',
                        scope: me.getController()
                    }, {
                        text: '编辑',
                        handler: 'on_menu_edit',
                        scope: me.getController()
                    }, {
                        text: '删除',
                        handler: 'on_menu_remove',
                        scope: me.getController()
                    }, {
                        xtype: 'menuseparator'
                    }, {
                        text: '新建',
                        handler: 'on_menu_new',
                        scope: me.getController()
                    }, {
                        text: '刷新',
                        handler: 'on_menu_refresh',
                        scope: me.getController()
                    }, {
                        text: '同步',
                        handler: 'on_menu_sync',
                        scope: me.getController()
                    }]
                });
                me.menus.add(menuId, menu);
            } else {
                menu = me.menus.get(menuId);
            }
            return menu;
        }

    },

    getContainerContextMenu: function () {
        var me = this,
            menuId = 'container',
            menu, readonly = !!me.readonly;
        if (!readonly) {
            if (!me.menus.get(menuId)) {
                menu = Ext.create('Ext.menu.Menu', {
                    items: [{
                        text: '新建',
                        handler: 'on_menu_new',
                        scope: me.getController()
                    }, {
                        text: '刷新',
                        handler: 'on_menu_refresh',
                        scope: me.getController()
                    }, {
                        text: '同步',
                        handler: 'on_menu_sync',
                        scope: me.getController()
                    }]
                });
                me.menus.add(menuId, menu);
            } else {
                menu = me.menus.get(menuId);
            }
            return menu;
        }
    }

});