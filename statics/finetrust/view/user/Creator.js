/**
 * Created by 0xFranCiS on Jun 04, 2016.
 */
Ext.define('Finetrust.view.user.Creator', {
    extend: 'Finetrust.view.EntityCreator',

    requires: [
        'Ext.form.Panel'
    ],

    controller: 'entity-creator',
    
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
            fieldLabel: '密码',
            name: 'password',
            bind: '{data.password}'
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