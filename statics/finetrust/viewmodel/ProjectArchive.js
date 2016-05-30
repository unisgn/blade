/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.viewmodel.ProjectArchive', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.project_archive',

    requires: [
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.data.MyRestProxy',
        'Finetrust.model.Attachment',
        'Finetrust.model.ProjectArchive'
    ],

    stores: {
        tran_docs: {
            model: 'Finetrust.model.ProjectArchive',
            proxy: {
                type: 'my-rest',
                url: '/api/Project/{data.id}/transdoc'
            },
            autoLoad: true
        },
        attachments: {
            model: 'Finetrust.model.Attachment',
            proxy: {
                type: 'my-ajax',
                url: '/api/Attachment',
                api: {
                    destroy: '/api/Attachment/remove'
                },
                extraParams: {
                    fkid: '{data.id}'
                }
            },
            autoLoad: true,
            autoSync: true
        }
    }
});