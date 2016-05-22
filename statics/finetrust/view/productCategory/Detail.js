/**
 * Created by 0xFranCiS on May 13, 2016.
 */

Ext.define('Finetrust.view.productCategory.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox'
    ],

    controller: 'entity-detail',

    items: {
        xtype: 'form',
        defaultType: 'textfield',
        defaults: {
            readOnly: false
        },
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Parent',
            name: 'parent_id',
            store: Finetrust.data.Dict.dictstore('root_product_category'),
            queryMode: 'local',
            anyMatch: true,
            valueField: 'value',
            displayField: 'text',
            bind: {
                value: '{data.parent_id}'
            }
        }, {
            fieldLabel: 'code',
            name: 'code',
            bind: '{data.code}'
        }, {
            fieldLabel: 'name',
            name: 'name',
            bind: '{data.name}'
        }, {
            fieldLabel: 'brief',
            name: 'brief',
            bind: '{data.brief}'
        }, {
            fieldLabel: 'fullname',
            name: 'fullname',
            bind: '{data.fullname}',
            readOnly: true
        }]
    },

    initReadonly: function () {
        var me = this;
        me.items.defaults = {
            readOnly: me.getReadonly()
        };

        me.callParent(arguments);
    }
});