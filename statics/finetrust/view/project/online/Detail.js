/**
 * Created by 0xFranCiS on May 14, 2016.
 */


Ext.define('Finetrust.view.project.online.Detail', {
    extend: 'Finetrust.view.EntityDetail',
    
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
            bind: '{data.number}',
            readOnly: true
        }, {
            fieldLabel: 'Code',
            name: 'code',
            bind: '{data.code}',
            readOnly: true
        }, {
            fieldLabel: 'Name',
            name: 'name',
            bind: '{data.name}',
            readOnly: true
        }, {
            fieldLabel: 'OnlineDate',
            name: 'online_date',
            bind: '{data.online_date}',
            xtype: 'datefield'
        },{
            fieldLabel: 'OnlineScale',
            name: 'online_scale',
            bind: '{data.online_scale}',
            xtype: 'numberfield'
        }]
    }
});