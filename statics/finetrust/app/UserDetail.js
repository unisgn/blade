/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.app.UserDetail', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel',
        'Finetrust.view.user.Detail'
    ],

    statics: {
        launch: function (cfg) {
            var me = this, cfg = cfg || {};
            Ext.apply(cfg, {
                viewModel: Ext.create('Ext.app.ViewModel',
                    me.viewmodel_cfg(cfg, 'Finetrust.model.User')
                ),
                readonly: !!cfg.readonly
            });

            Ext.create('Finetrust.view.user.Detail', cfg).show();
        }
    }
});