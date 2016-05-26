/**
 * Created by 0xFranCiS on May 22, 2016.
 */
Ext.define('Finetrust.view.organization.Grid', {
    extend: 'Finetrust.view.EntityTreeGrid',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Finetrust.model.Organization'
    ],

    detailApp: 'Finetrust.app.OrganizationDetail',

    store: {
        model: 'Finetrust.model.Organization',
        autoLoad: true,
        parentIdProperty: 'parent_id',
        proxy: {
            type: 'ajax',
            url: '../api/tree/Organization',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    },
    
    columns: {
        items:[{
            xtype: 'treecolumn',
            dataIndex: 'name',
            text: '机构名',
            width: 250
        }, {
            text: '机构号',
            dataIndex: 'code'
        },{
            text: '说明',
            dataIndex: 'brief'
        }]
    }
});