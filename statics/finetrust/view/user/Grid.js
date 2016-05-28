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
        'Finetrust.model.User',
        'Finetrust.view.EntityGrid',
        'Finetrust.view.user.QueryPanel'
    ],

    viewModel: {
        data: {
            search_text: null,
            organization: null,
            duty: null
        }

    },

    detailApp: 'Finetrust.app.UserDetail',

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

    createQueryPanel: function () {
        return Ext.create('Finetrust.view.user.QueryPanel');
    },

    createInlineCriteria: function () {

    }

});