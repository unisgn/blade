/**
 * Created by 0xFranCiS on May 10, 2016.
 */

Ext.define('Finetrust.view.user.QueryPanel', {
    extend: 'Finetrust.view.QueryPanel',

    requires: [
        'Ext.form.Panel',
        'Ext.util.Filter'
    ],


    width: 480,
    height: 360,

    viewModel: {
        data: {
            username: '',
            password: ''
        }
    },

    items: {
        xtype: 'form',
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'username',
            name: 'username',
            bind: '{username}'
        }, {
            fieldLabel: 'password',
            name: 'password',
            bind: '{password}'
        }]
    },

    createCriteria: function () {
        var me = this, data = me.getViewModel().getData();
        var ret = [];

        Ext.Object.each(data, function (key, val) {
            if (Ext.String.trim(val) != '') {
                ret.push(Ext.create('Ext.util.Filter', {
                    property: key,
                    value: val
                }));
            }
        });
        
        return ret;
    }
});