/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.view.user.Grid', {
    extend: 'Finetrust.view.EntityGrid',

    xtype: 'user-grid',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.grid.column.Date',
        'Finetrust.data.MyRestProxy',
        'Finetrust.model.Role',
        'Finetrust.model.User',
        'Finetrust.view.EntityGrid',
        'Finetrust.view.user.PermissionTree',
        'Finetrust.view.user.QueryPanel',
        'Finetrust.view.user.RoleGrid'
    ],

    viewModel: {
        data: {
            search_text: null,
            organization: null,
            duty: null
        }

    },

    app: 'Finetrust.app.User',

    tbar: {
        defaults: {
            anyMatch: true,
            forceSelection: true,
            width: 150
        },
        items: [{
            xtype: 'button',
            text: '重置',
            handler: 'reset_inline_criteria',
            width: 50
        }, {
            xtype: 'textfield',
            name: 'search-area',
            // triggers: {
            //     clear: {
            //         cls: 'x-form-clear-trigger',
            //         handler: function () {
            //             this.reset();
            //         }
            //     }
            // },
            emptyText: '关键字',
            bind: '{search_text}',
            enableKeyEvents: true,
            listeners: {
                keypress: 'request_inline_criteria'
            }
        }, {
            xtype: 'combobox',
            name: 'organization',
            emptyText: '机构',
            store: Finetrust.data.Dict.nullabledictstore('organization', '空'),
            displayField: 'text',
            valueField: 'value',
            bind: '{organization}',
            enableKeyEvents: true,
            listeners: {
                keypress: 'request_inline_criteria'
            }
        }, {
            name: 'duty',
            xtype: 'combobox',
            queryMode: 'local',
            queryCaching: false,
            emptyText: '岗位',
            store: Finetrust.data.Dict.nullabledictstore('duty', '空'),
            displayField: 'text',
            valueField: 'value',
            bind: '{duty}',
            enableKeyEvents: true,
            listeners: {
                keypress: 'request_inline_criteria'
            }
        }]
    },


    store: {
        model: 'Finetrust.model.User',
        autoLoad: true,
        remoteFilter: true
    },

    columns: [{
        text: '用户名',
        dataIndex: 'username'
    }, {
        text: '所属机构',
        dataIndex: 'password'
    }, {
        text: '岗位',
        width: 180,
        dataIndex: 'last_modified_date',
        xtype: 'datecolumn',
        format: 'Y-m-d H:i:s'
    }],
    
    
    
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
                    },{
                        text: '查看权限',
                        handler: me.on_menu_view_permission,
                        scope: me
                    }, {
                        text: '编辑',
                        handler: 'on_menu_edit',
                        scope: me.getController()
                    },{
                        text: '分配角色',
                        handler: me.on_menu_assign_role,
                        scope: me
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


    createQueryPanel: function () {
        return Ext.create('Finetrust.view.user.QueryPanel');
    },

    createInlineCriteria: function () {

    },
    
    
    on_menu_assign_role: function () {
        var me = this,
            rec = me.getSelection()[0];
        if (rec) {
            Ext.create('Finetrust.view.user.RoleGrid', {
                 viewModel: {
                     data: {
                         data: rec
                     },
                     stores: {
                         roles: {
                             model: 'Finetrust.model.Role',
                             proxy: {
                                 type: 'my-rest',
                                 url: '/api/User/' + rec.getId() + '/role'
                             },
                             autoLoad: true,
                             autoSync: true
                         }
                     }
                 }
            }).show();
        }
    },
    
    
    on_menu_view_permission: function () {
        var me = this,
            rec = me.getSelection()[0];
        if (rec) {
            Ext.create('Finetrust.view.user.PermissionTree', {
                 viewModel: {
                     data: {
                         data: rec
                     }
                 }
            }).show();
        }
    }

});