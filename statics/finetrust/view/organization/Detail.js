/**
 * Created by 0xFranCiS on May 22, 2016.
 */
Ext.define('Finetrust.view.organization.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox'
    ],

    bind: {
        title: '机构@{data.name}'
    },


    items: {
        xtype: 'form',
        defaultType: 'textfield',
        items: [{
            fieldLabel: '上级机构',
            name: 'parent_id',
            xtype: 'combobox',
            store: Finetrust.data.Dict.dictstore('organization'),
            anyMatch: true,
            queryMode: 'local',
            valueField: 'value',
            displayField: 'text',
            bind: '{data.parent_id}'
        }, {
            fieldLabel: '机构名',
            name: 'name',
            bind: '{data.name}'
        }, {
            fieldLabel: '机构代码',
            name: 'code',
            bind: '{data.code}'
        }, {
            fieldLabel: '说明',
            name: 'brief',
            bind: '{data.brief}'
        }]
    },

    initReadonly: function () {
        var me = this;
        me.items.defaults = {
            readOnly: me.getMode() === 'readonly'
        };

        me.callParent();
    }

});