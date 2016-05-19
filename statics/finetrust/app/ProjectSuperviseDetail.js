/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectSuperviseDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Finetrust.model.ProjectSuperviseIssue',
        'Finetrust.view.project.SuperviseDetail'
    ],


    statics: {
        launch: function (cfg) {
            // var links = {
            //     type: 'Finetrust.model.Project'
            // },
            //     cfg = cfg || {};
            //
            // if (_cfg.id) {
            //     links.id = _cfg.model;
            // } else {
            //     links.create = true;
            // }
            //
            // var url = '/api/Project/' + _cfg.id + '/supervise_issues';
            // Finetrust.model.ProjectSuperviseIssue.setProxy(Ext.create('Ext.data.proxy.Rest',{
            //     url: url,
            //     reader: {
            //         type: 'json',
            //         rootProperty: 'data'
            //     }
            // }));
            //
            // // console.log(Finetrust.model.ProjectAccount.getProxy());
            //
            // var model = cfg.model;


            Ext.create('Finetrust.view.project.SuperviseDetail', {
                viewModel: Ext.create('Ext.app.ViewModel', {
                    data: {
                        data: cfg.model
                    },
                    stores: {
                        issues: {
                            model: 'Finetrust.model.ProjectSuperviseIssue',
                            autoLoad: true,
                            proxy: {
                                url: Ext.String.format('/api/Project/{0}/supervise_issues', cfg.model.getId()),
                                type: 'rest',
                                reader: {
                                    'rootProperty': 'data'
                                }
                            }
                        }
                    }
                }),
                readonly: !!cfg.readonly
            }).show();
        }
    }
});