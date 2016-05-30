/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.supervise.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.Project',
        'Finetrust.view.EntityGrid'
    ],

    title: '投资监督事项',


    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.ProjectSupervise',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/supervise',
                type:'my-ajax'
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