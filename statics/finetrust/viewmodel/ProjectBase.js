/**
 * Created by 0xFranCiS on May 28, 2016.
 */
Ext.define('Finetrust.viewmodel.ProjectBase', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.project_base',

    requires: [
        'Finetrust.data.MyRestProxy',
        'Finetrust.model.Attachment',
        'Finetrust.model.ProjectAgent',
        'Finetrust.model.ProjectPreAccount'
    ],

    formulas: {
        main_direction: {
            get: function (get) {
                var v = get('data.invest_advisor');
                if (!Ext.isEmpty(v)) {
                    return {
                        main_direction: v.split(',')
                    }
                }
            },
            set: function (value) {
                let src = value.main_direction,
                    dest = Ext.isArray(src) ? src.join(',') : src;
                this.set('data.invest_advisor', dest);
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
                type: 'my-rest',
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
                type: 'my-rest',
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
                type: 'my-rest',
                extraParams: {
                    fkid: '{data.id}'
                }
            }
        }
    }
});