/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.EssentialGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.view.ModelGrider',
        'Finetrust.model.Project',
        'Finetrust.data.Dict'
    ],

    title: '市场要素',


    items: {
        xtype: 'model-grid',
        detailApp: 'Finetrust.app.ProjectEssentialDetail',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/essential',
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