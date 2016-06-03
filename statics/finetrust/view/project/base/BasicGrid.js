/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.base.BasicGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.grid.column.Date',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.Project',
        'Finetrust.view.EntityGrid'
    ],

    title: '项目立项',


    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.ProjectBase',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '/api/data/project/basic',
                type:'my-ajax'
            }
        },
        columns: [{
            text: '编号',
            dataIndex: 'number'
        }, {
            text: '名称',
            dataIndex: 'name'
        }, {
            text: '类型',
            dataIndex: 'proj_type',
            renderer: Finetrust.data.Dict.keyrenderer('project_type')
        },{
            text: '创建日期',
            dataIndex: 'create_date',
            xtype: 'datecolumn',
            format: 'Y-m-d'
        }]

    }
});