
/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.archive.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Finetrust.model.Project',
        'Finetrust.view.EntityGrid'
    ],

    title: '项目归档',
    
    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.ProjectArchive',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '/api/data/project/archive',
                type: 'ajax',
                reader: {
                    rootProperty: 'data',
                    type: 'json'
                }
            }
        },
        columns: [{
            text: '项目编号',
            dataIndex: 'number'
        }, {
            text: '项目名称',
            dataIndex: 'name'
        },{
            text: '类型',
            dataIndex: 'proj_type',
            renderer: Finetrust.data.Dict.keyrenderer('project_type')
        }]
    }
});