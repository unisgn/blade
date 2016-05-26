/**
 * Created by 0xFranCiS on May 24, 2016.
 */
Ext.define('Finetrust.view.project.ProjectAgent', {
    extend: 'Beaux.desktop.XWindow',

    items: {
        xtype: 'form',
        defaultType: 'textfield',
        items: [{
            fieldLabel: '公司名',
            name: 'corp_name',
            bind: '{data.corp_name}'
        }, {
            fieldLabel: '法人',
            name: 'corp_name',
            bind: '{data.legalman}'
        }, {
            fieldLabel: '地址',
            name: 'addr',
            bind: '{data.addr}'
        }, {
            fieldLabel: '邮编',
            name: 'zipcode',
            bind: '{data.zipcode}'
        }, {
            fieldLabel: '电话',
            name: 'phone',
            bind: '{data.phone}'
        }, {
            fieldLabel: '联系人',
            name: 'contact',
            bind: '{data.contact}'
        }, {
            fieldLabel: '联系人电话',
            name: 'contact_phone',
            bind: '{data.contact_phone}'

        }]
    }

});