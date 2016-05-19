/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.SuperviseJournalGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Finetrust.data.Dict',
        'Finetrust.model.ProjectSuperviseIssue',
        'Finetrust.model.ProjectSuperviseJournal',
        'Finetrust.view.EntityGrid'
    ],

    title: '手工监督事项',


    items: {
        xtype: 'entity-grid',
        detailApp: 'Finetrust.app.ProjectSuperviseJournalDetail',
        store: {
            model: 'Finetrust.model.ProjectSuperviseIssue',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/supervise/journal',
                type:'ajax',
                reader: {
                    rootProperty: 'data',
                    type: 'json'
                }
            }
        },
        columns: [{
            text: '项目编号',
            dataIndex: 'project',
            renderer: function(v) {
                return v.code;
            }
        }, {
            text: '项目名称',
            dataIndex: 'project',
            renderer: function (v) {
                return v.name;
            }
        },{
            text: '监督类型',
            dataIndex: 'issue_type',
            renderer: Finetrust.data.Dict.keyrenderer('supervise_type')
        }, {
            text: '监督内容',
            dataIndex: 'content'
        }]

    }
});