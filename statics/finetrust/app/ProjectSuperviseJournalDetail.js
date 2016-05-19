/**
 * Created by 0xFranCiS on May 15, 2016.
 */
Ext.define('Finetrust.app.ProjectSuperviseJournalDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Finetrust.model.ProjectSuperviseJournal',
        'Finetrust.view.project.SuperviseJournalDetail'
    ],

    statics: {
        launch: function (cfg) {
            var model = cfg.model;

            Ext.create('Finetrust.view.project.SuperviseJournalDetail', {
                viewModel: Ext.create('Ext.app.ViewModel', {
                    data: {
                        data: model
                    },
                    stores: {
                        journals: {
                            model: 'Finetrust.model.ProjectSuperviseJournal',
                            proxy: {
                                type: 'rest',
                                url: Ext.String.format('/api/ProjectSuperviseIssue/{0}/journals', model.getId()),
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            },
                            autoLoad: true
                        }
                    }
                }),
                readonly: !!cfg.readonly
            }).show();
        }
    }
});