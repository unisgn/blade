/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.accounts.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.controller.ProjectAccountsGrid',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.Project',
        'Finetrust.view.EntityGrid'
    ],

    title: '项目账户',


    items: {
        xtype: 'entity-grid',
        controller: 'project-sub-grid',
        app: 'Finetrust.app.ProjectAccounts',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '/api/data/project/accounts',
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