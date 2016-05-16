/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.BasicGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Finetrust.data.Dict',
        'Finetrust.model.Project',
        'Finetrust.view.EntityGrid'
    ],

    title: '项目立项',


    items: {
        xtype: 'entity-grid',
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
        }, {
            text: 'Type',
            dataIndex: 'proj_type',
            renderer: function (val) {
                return Finetrust.data.Dict.get('project_type')[val]['text']
            }
        },{
            text: '创建日期',
            dataIndex: 'create_date'
        }]

    }
});