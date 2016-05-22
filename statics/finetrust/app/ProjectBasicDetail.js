/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.app.ProjectBasicDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.model.Project',
        'Finetrust.view.project.BasicDetail'
    ],

    statics: {
        launch: function (cfg) {
            Ext.apply(cfg, {
                viewModel:  this.viewmodel_cfg(cfg, 'Finetrust.model.Project'),
                readonly: !!cfg.readonly
            });

            Ext.create('Finetrust.view.project.BasicDetail', cfg).show();
        }
    }
});