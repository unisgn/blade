/**
 * Created by 0xFranCiS on May 14, 2016.
 */

Ext.define('Finetrust.view.project.BasicDetail', {
    extend: 'Finetrust.view.ModelDetail',
    
    requires: [
        'Finetrust.model.Project'
    ],
    
    items: {
        xtype: 'form',
        defaultType: 'textfield',
        defaults: {
            readOnly: false
        },
        items: [{
            fieldLabel: 'Number',
            name: 'number',
            bind: '{data.number}'
        }, {
            fieldLabel: 'Code',
            name: 'code',
            bind: '{data.code}'
        },{
            fieldLabel: 'Name',
            name: 'name',
            bind: '{data.name}'
        }]
    }
});