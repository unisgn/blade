/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.view.project.OperatorsGrid', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Finetrust.view.EntityGrid',
        'Finetrust.model.Project'
    ],

    title: '运营权限分配',

    width: 800,



    items: {
        xtype: 'entity-grid',
        detailApp: 'Finetrust.app.ProjectOperatorsDetail',
        store: {
            model: 'Finetrust.model.Project',
            autoLoad: true,
            proxy: {
                url: '../api/data/project/operators',
                type: 'ajax',
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
            text: '帐套号',
            dataIndex: 'acct_num'
        }, {
            text: '资产代码',
            dataIndex: 'asset_code'
        }, {
            text: '经办',
            dataIndex: 'clerks_operator',
            renderer: Finetrust.data.Dict.spliterkeyrenderer('user')
        }, {
            text: '复核',
            dataIndex: 'clerks_checker',
            renderer: Finetrust.data.Dict.spliterkeyrenderer('user')
        }, {
            text: '主管',
            dataIndex: 'clerks_director',
            renderer: Finetrust.data.Dict.spliterkeyrenderer('user')
        }]

    }
});