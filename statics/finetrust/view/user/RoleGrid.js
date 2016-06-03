/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.view.user.RoleGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Check'
    ],

    bind: {
        title: '用户@{data.username} -> 角色'
    },

    items: {
        xtype: 'grid',
        forceFit: true,
        viewConfig: {
            stripeRows: true
        },
        bind: {
            store: '{roles}'
        },

        columns: [{
            text: '编号',
            dataIndex: 'code'
        }, {
            text: '说明',
            dataIndex: 'memo'
        },{
            text: '选择',
            xtype: 'checkcolumn',
            dataIndex: 'checked'
        }],
        listeners: {
            'itemdblclick': (cmp, record) => {
                Beaux.launch('Finetrust.app.Role', {
                    id: record.getId(),
                    mode: 'readonly'
                })
            }
        }
    }

});