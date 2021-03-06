/**
 * Created by 0xFranCiS on May 09, 2016.
 */
Ext.define('Finetrust.view.user.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel'
    ],

    controller: 'entity-detail',

    bind: {
        title: '用户@{data.id}'
    },


    items: {
        xtype: 'form',
        bodyPadding: 5,
        defaultType: 'textfield',
        items: [{
            fieldLabel: '用户名',
            name: 'id',
            bind: '{data.id}'
        }, {
            fieldLabel: '机构',
            name: 'org_fk',
            xtype: 'combobox',
            store: Finetrust.data.Dict.dictstore('organization'),
            valueField: 'value',
            displayField: 'text',
            anyMatch: true,
            queryMode: 'local',
            bind: '{data.org_fk}'
        }, {
            fieldLabel: '姓名',
            name: 'id',
            bind: '{data.name}'
        }, {
            fieldLabel: '别名',
            name: 'id',
            bind: '{data.alias}'
        }, {
            fieldLabel: '备注',
            name: 'memo',
            bind: '{data.memo}'

        }]
    },

    initReadonly: function () {
        var me = this;
        me.items.defaults = {
            readOnly: me.getMode() === 'readonly'
        };

        me.callParent(arguments);
    }


});