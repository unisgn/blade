/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.app.ProjectBase', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Project',
        'Finetrust.view.project.base.BasicGrid',
        'Finetrust.view.project.base.Creator',
        'Finetrust.view.project.base.Updator',
        'Finetrust.viewmodel.ProjectBase'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.project.base.BasicGrid',
        creator: 'Finetrust.view.project.base.Creator',
        updator: 'Finetrust.view.project.base.Updator',

        update_detail: function (id, mode) {
            var me = this;
            Ext.create(me.updator, {
                viewModel: {
                    type: 'project_base',
                    links: {
                        data: {
                            type: me.model,
                            id: id
                        }
                    }
                },
                mode: mode
            }).show();
        }
    }
});