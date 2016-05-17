/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.AccountsGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Finetrust.controller.ProjectAccountsGrid',
        'Finetrust.model.Project',
        'Finetrust.view.EntityGrid'
    ],

    title: '项目账户',


    items: {
        xtype: 'entity-grid',
        controller: 'project-sub-grid',
        detailApp: 'Finetrust.app.ProjectAccountsDetail',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/accounts',
                type:'ajax',
                reader: {
                    rootProperty: 'data',
                    type: 'json'
                }
            }
        },
        columns: [{
            text: 'Num',
            dataIndex: 'number'
        }, {
            text: 'Name',
            dataIndex: 'name'
        },{
            text: 'Type',
            dataIndex: 'proj_type'
        }]

    }
});