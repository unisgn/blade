/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.online.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.Project',
        'Finetrust.view.EntityGrid'
    ],

    title: '项目上线',


    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.ProjectOnline',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/online',
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
            dataIndex: 'proj_type',
            renderer: Finetrust.data.Dict.keyrenderer('project_type')
        }]

    }
});