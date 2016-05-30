/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.supervise.journal.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.ProjectSuperviseIssue',
        'Finetrust.view.EntityGrid'
    ],

    title: '手工监督事项',


    items: {
        xtype: 'entity-grid',
        app: 'Finetrust.app.ProjectSuperviseJournal',
        store: {
            model: 'Finetrust.model.ProjectSuperviseIssue',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/supervise/journal',
                type:'my-ajax'
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