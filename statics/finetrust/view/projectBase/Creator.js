/**
 * Created by 0xFranCiS on May 28, 2016.
 */
Ext.define('Finetrust.view.projectBase.Creator', {
    extend: 'Beaux.desktop.XWindow',
    
    items: {
        xtype: 'form',
        defaultType: 'textfield',
        items: [{
            name: 'number',
            fieldLabel: '编号',
            bind: '{data.number}'
        }, {
            name: 'code',
            fieldLabel: '代码',
            bind: '{data.code}'
        },{
            name: 'name',
            fieldLabel: '名称',
            bind: '{data.name}'
        }]
    }
});