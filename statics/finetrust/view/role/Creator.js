/**
 * Created by 0xFranCiS on May 30, 2016.
 */
Ext.define('Finetrust.view.role.Creator', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.TextArea'
    ],

    bind: {
        title: '角色@{data.code}'
    },


    items: [{
        xtype: 'form',
        bodyPadding: 5,
        defaultType: 'textfield',
        items: [{
            fieldLabel: '代码',
            name: 'code',
            bind: '{data.code}'
        }, {
            fieldLabel: '名称',
            bind: '{data.name}'
        }, {
            fieldLabel: '说明',
            xtype: 'textarea',
            bind: '{data.memo}'
        }],
        buttons: [{
            text: '创建',
            handler: function (cmp) {
                var win = cmp.up('window'), data = win.getViewModel().get('data');
                data.save({
                    success: () => {
                        Beaux.launch('Finetrust.app.User', {
                            id: data.getId(),
                            mode: 'update'
                        });
                        win.close();
                    }
                });
            }
        }]
    }]


});