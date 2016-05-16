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
        
        detailApp: undefined
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
    onDestroy: function () {
        var me = this;
        me.menus.each(function (key, val, len) {
            val.destroy();
        });

        me.callParent();
    }

});