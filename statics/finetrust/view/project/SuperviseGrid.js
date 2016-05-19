/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.SuperviseGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Finetrust.data.Dict',
        'Finetrust.model.Project',
        'Finetrust.model.ProjectSuperviseIssue',
        'Finetrust.view.EntityGrid'
    ],

    title: '投资监督事项',


    items: {
        xtype: 'entity-grid',
        detailApp: 'Finetrust.app.ProjectSuperviseDetail',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/supervise',
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