/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */

Ext.define('Finetrust.app.ProjectArchiveDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Finetrust.model.Attachment',
        'Finetrust.model.ProjectArchive',
        'Finetrust.view.project.ArchiveDetail'
    ],

    statics: {
        launch: function (cfg) {
            var model = cfg.model;
            
            
            
            Ext.create('Finetrust.view.project.ArchiveDetail', {
                viewModel: Ext.create('Ext.app.ViewModel', {
                    data: {
                        data: model
                    },
                    stores: {
                        tran_docs: {
                            model: 'Finetrust.model.ProjectArchive',
                            proxy: {
                                type: 'rest',
                                url: Ext.String.format('/api/Project/{0}/transdoc', model.getId()),
                                reader: {
                                    rootProperty: 'data',
                                    type: 'json'
                                }
                            },
                            autoLoad: true
                        },
                        attachments: {
                            model: 'Finetrust.model.Attachment',
                            proxy: {
                                type: 'ajax',
                                url: '/api/Attachment',
                                api: {
                                    destroy: '/api/Attachment/remove'
                                },
                                extraParams: {
                                    fkid: model.getId()
                                },
                                reader: {
                                    rootProperty: 'data',
                                    type: 'json'
                                }
                            },
                            autoLoad: true,
                            autoSync: true
                        }
                    }
                }),
                readonly: !!cfg.readonly
            }).show();
        }
    }
});