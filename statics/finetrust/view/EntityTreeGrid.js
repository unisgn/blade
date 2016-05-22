/**
 * Created by 0xFranCiS on May 13, 2016.
 */
;Ext.define('Finetrust.view.EntityTreeGrid', {
    extend: 'Ext.tree.Panel',


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
        scope: 'controller' // IMPORTANT
    },

    rootVisible: false,


    /**
     * @type {Beaux.desktop.XWindow}
     */


    config: {
        /**
         * stores all the context menu
         * and remember to destroy all the menus after the component is destroyed
         * @type {Ext.util.HashMap}
         */
        menus: Ext.create('Ext.util.HashMap'),
        
        detailApp: undefined,
        
        readonly: false
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
                    }]
                });
                me.menus.add(menuId, menu);
            } else {
                menu = me.menus.get(menuId);
            }
            return menu;
        }
    },


    /**
     * @override
     */
    onDestroy: function () {
        var me = this;
        me.menus.each(function (key, val, len) {
            val.destroy();
        });
        
        me.menus.clear();

        me.callParent(arguments);
    }

});