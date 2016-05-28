/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.app.ProjectBase', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Project',
        'Finetrust.view.projectBase.BasicGrid',
        'Finetrust.view.projectBase.Creator',
        'Finetrust.view.projectBase.Updator',
        'Finetrust.viewmodel.ProjectBase'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Project',
        grid: 'Finetrust.view.projectBase.BasicGrid',
        creator: 'Finetrust.view.projectBase.Creator',
        updator: 'Finetrust.view.projectBase.Updator',

        update_detail: function (id, mode) {
            var me = this;
            Ext.create(me.updator, {
                viewModel: {
                    type: 'projectbase',
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