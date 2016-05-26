/**
 * Created by 0xFranCiS on May 20, 2016.
 */
Ext.define('Finetrust.app.OrganizationDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.view.organization.Detail'
    ],

    statics: {
        launch: function (cfg) {
            var cfg = cfg || {};
            Ext.apply(cfg, {
                viewModel: Ext.create('Ext.app.ViewModel',
                    this.viewmodel_cfg(cfg, 'Finetrust.model.Organization')),
                readonly: !!cfg.readonly
            });
            
            Ext.create('Finetrust.view.organization.Detail', cfg).show();
        }
    }
});