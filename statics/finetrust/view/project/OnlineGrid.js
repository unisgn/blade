/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.OnlineGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.view.ModelGrider',
        'Finetrust.model.Project',
        'Finetrust.data.Dict'
    ],

    title: '项目上线',


    items: {
        xtype: 'model-grid',
        detailApp: 'Finetrust.app.ProjectOnlineDetail',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/online',
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