/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.app.ProjectBasicDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.model.Attachment',
        'Finetrust.model.Project',
        'Finetrust.model.ProjectAgent',
        'Finetrust.model.ProjectPreAccount',
        'Finetrust.view.project.BasicDetail',
        'Finetrust.view.project.BasicDetailed'
    ],

    statics: {
        launch: function (cfg) {
            cfg = cfg || {};
            var model = cfg.model;
            model = model.getId ? model.getId() : model;
            if (model || model.getId) {
                Ext.create('Finetrust.view.project.BasicDetailed', {
                    viewModel: Ext.create('Ext.app.ViewModel', {
                        links: {
                            data: {
                                type: 'Finetrust.model.Project',
                                id: model || model.getId()
                            }
                        },
                        formulas: {
                            main_direction: {
                                get: function (get) {
                                    var v = get('data.invest_advisor');
                                    if (typeof(v) == 'string') {
                                        return {
                                            main_direction: v.split(',')
                                        }
                                    }
                                },
                                set: function (value) {
                                    var values = value.main_direction;
                                    if (typeof(values) === 'string') {
                                        this.getData().data.set('invest_advisor', values);
                                    } else {
                                        this.getData().data.set('invest_advisor', values.join(','));
                                    }

                                }
                            }
                        },
                        stores: {
                            pre_accounts: {
                                model: 'Finetrust.model.ProjectPreAccount',
                                autoLoad: true,
                                autoSync: true,
                                proxy: {
                                    url: '/api/ProjectPreAccount',
                                    type: 'rest',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data'
                                    },
                                    extraParams: {
                                        project_id: '{data.id}'
                                    }
                                }
                            },
                            agents: {
                                model: 'Finetrust.model.ProjectAgent',
                                autoLoad: true,
                                autoSync: true,
                                proxy: {
                                    url: '/api/ProjectAgent',
                                    type: 'rest',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data'
                                    },
                                    extraParams: {
                                        project_id: '{data.id}'
                                    }
                                }
                            },
                            attachments: {
                                model: 'Finetrust.model.Attachment',
                                autoLoad: true,
                                autoSync: true,
                                proxy: {
                                    url: '/api/Attachment',
                                    type: 'rest',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'data'
                                    },
                                    extraParams: {
                                        fkid: '{data.id}'
                                    }
                                }
                            }
                        }
                    }),
                    readonly: !!cfg.readonly
                }).show();
            } else {
                Ext.create('Finetrust.view.project.BasicDetail', {
                    viewModel: Ext.create('Ext.app.ViewModel', {
                        links: {
                            data: {
                                type: 'Finetrust.model.Project',
                                create: true
                            }
                        }
                    }),
                    readonly: false
                }).show();
            }


        }
    }
});