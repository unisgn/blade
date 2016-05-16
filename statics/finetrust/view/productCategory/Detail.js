/**
 * Created by 0xFranCiS on May 13, 2016.
 */

Ext.define('Finetrust.view.productCategory.Detail', {
    extend: 'Finetrust.view.EntityDetail',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Finetrust.model.ProductCategory'
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
            name: 'parent',
            store: Ext.create('Ext.data.Store', {
                model: 'Finetrust.model.ProductCategory',
                proxy: {
                    type: 'ajax',
                    url: '../api/dict/ProductCategory',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },
                autoLoad: true
            }),
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            bind: '{data.parent_id}'
        },{
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
        },{
            fieldLabel: 'fullname',
            name: 'fullname',
            bind: '{data.fullname}',
            readOnly: true
        }]
    }
});