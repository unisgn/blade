/**
 * Created by 0xFranCiS on May 22, 2016.
 */
Ext.define('Finetrust.view.organization.Grid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.tree.Column',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.Organization',
        'Finetrust.view.EntityTreeGrid'
    ],
    
    title: '组织机构树',

    items: {
        xtype: 'entity-treegrid',
        app: 'Finetrust.app.Organization',
        store: {
            model: 'Finetrust.model.Organization',
            autoLoad: true,
            parentIdProperty: 'parent_fk',
            proxy: {
                type: 'my-ajax',
                url: '/api/tree/Organization'
            }
        },

        columns: {
            items: [{
                xtype: 'treecolumn',
                dataIndex: 'name',
                text: '机构名',
                width: 250
            }, {
                text: '机构号',
                dataIndex: 'code'
            }, {
                text: '说明',
                dataIndex: 'brief'
            }]
        }
    }


});