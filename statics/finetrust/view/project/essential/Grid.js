/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.essential.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.grid.column.Date',
        'Finetrust.model.Project',
        'Finetrust.model.ProjectEssential',
        'Finetrust.view.EntityGrid'
    ],

    title: '市场要素',


    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.ProjectEssential',
        store: {
            model: 'Finetrust.model.ProjectEssential',
            autoLoad: true,
            // proxy: {
            //     url: '../api/data/project/essential',
            //     type:'ajax',
            //     reader: {
            //         rootProperty: 'data',
            //         type: 'json'
            //     }
            // }
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
            text: '合同状态',
            dataIndex: 'contract_status',
            renderer: Finetrust.data.Dict.keyrenderer('contract_status')
        },{
            text: '成立日期',
            dataIndex: 'setup_date',
            xtype: 'datecolumn',
            format: 'Y-m-d'
        }]

    }
});