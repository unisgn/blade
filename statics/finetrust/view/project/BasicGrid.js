/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.BasicGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.view.ModelGrider',
        'Finetrust.model.Project'
    ],

    title: '项目立项',


    items: {
        xtype: 'model-grid',
        detailApp: 'Finetrust.app.ProjectBasicDetail',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/basic',
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