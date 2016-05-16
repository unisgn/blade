/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.OperatorsGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.view.EntityGrid',
        'Finetrust.model.Project',
        'Finetrust.data.Dict'
    ],

    title: '权限分配',


    items: {
        xtype: 'entity-grid',
        detailApp: 'Finetrust.app.ProjectOperatorsDetail',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/operators',
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