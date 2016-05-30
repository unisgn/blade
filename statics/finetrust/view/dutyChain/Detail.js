/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.view.dutyChain.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Tag',
        'Ext.form.field.TextArea'
    ],

    controller: 'entity-detail',

    bind: {
        title: '审批链@{data.name}'
    },


    items: {
        xtype: 'form',
        defaultType: 'textfield',
        items: [{
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
            bind: '{data.brief}',
            xtype: 'textarea'
        }, {
            fieldLabel: 'Members',
            name: 'members',
            xtype: 'tagfield',
            store: Finetrust.data.Dict.dictstore('duty'),
            valueField: 'value',
            displayField: 'text',
            bind: '{data.members}'
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