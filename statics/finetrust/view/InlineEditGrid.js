/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.view.InlineEditGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.menu.Menu',
        'Ext.menu.Separator',
        'Ext.util.HashMap'
    ],

    // 3 line item height with header
    minHeight: 150,
    
    viewConfig: {
        stripeRows: true
    },
    
    forceFit: true,


    config: {
        readonly: false, 
        menus: Ext.create('Ext.util.HashMap')
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        if (!me.getReadonly()) {
            me.on({
                containercontextmenu: 'on_containercontextmenu',
                itemcontextmenu: 'on_itemcontextmenu',
                scope: me
            });
        }
    },

    on_containercontextmenu: function (cmp, e) {
        var me = this;
        me.show_menu('container', e, me.create_containercontextmenu);
    },


    on_itemcontextmenu: function (cmp, record, item, idx, e) {
        var me = this;
        me.show_menu('item', e, me.create_itemcontextmenu);
    },

    show_menu: function (menuId, e, creator) {
        var me = this, menus = me.menus, menu;
        if (!me.getReadonly()) {
            menu = menus.get(menuId);
            if (!menu) {
                menu = Ext.Function.bind(creator, me)();
                me.menus.add(menuId, menu);
            }
            menu.showAt(e.getX(), e.getY());
        }
    },

    create_containercontextmenu: function () {
        var me = this;
        return Ext.create('Ext.menu.Menu', {
            items: [{
                text: '新建',
                handler: 'on_menu_create',
                scope: me
            }, {
                text: '刷新',
                handler: 'on_menu_refresh',
                scope: me
            }, {
                text: '同步',
                handler: 'on_menu_sync',
                scope: me
            }]
        });
    },

    create_itemcontextmenu: function () {
        var me = this;
        return Ext.create('Ext.menu.Menu', {
            items: [{
                text: '删除',
                handler: 'on_menu_delete',
                scope: me
            }, {
                xtype: 'menuseparator'
            }, {
                text: '新建',
                handler: 'on_menu_create',
                scope: me
            }, {
                text: '刷新',
                handler: 'on_menu_refresh',
                scope: me
            }, {
                text: '同步',
                handler: 'on_menu_sync',
                scope: me
            }]
        });
    },

    on_menu_create: function () {
        var me = this,
            store = me.getStore(),
            record = new store.getModel();
        store.add(record);
    },

    on_menu_refresh: function () {
        this.getStore().reload();
    },

    on_menu_sync: function () {
        this.getStore().sync();
    },

    on_menu_delete: function () {
        var me = this,
            record = me.getSelection()[0];
        if (record) {
            me.getStore().remove(record);
        }
    },


    onDestroy: function () {
        var me = this;
        me.menus.each((k, v) => {
            v.destroy();
        });
        me.menus.clear();
        me.callParent();
    }
});