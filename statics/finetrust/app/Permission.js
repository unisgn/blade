/**
 * Created by 0xFranCiS on May 30, 2016.
 */

Ext.define('Finetrust.app.Permission', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Finetrust.model.Permission',
        'Finetrust.view.permission.Grid',
        'Finetrust.view.permission.Detail'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Permission',
        grid: 'Finetrust.view.permission.Grid',
        detail: 'Finetrust.view.permission.Detail',

        launch: function (cfg) {
            var me = this, cfg = cfg || {};
            if ('id' in cfg || 'mode' in cfg) {
                me.launch_detail(cfg);
            } else {
                me.launch_grid();
            }
        },

        launch_detail: function (cfg) {
            var me = this, id = cfg.id, mode = cfg.mode, parent_id = cfg.parent_id;
            if (id) {
                Ext.create(me.detail, {
                    viewModel: {
                        type: me.detailViewModel || 'default',
                        links: {
                            data: {
                                type: me.model,
                                id: id
                            }
                        }
                    },
                    mode: mode,
                    app: Ext.getClassName(me)
                }).show();
            } else {
                var rec = Ext.create(me.model);
                rec.set('parentId', cfg.parent_id);
                Ext.create(me.detail, {
                    viewModel: {
                        data: {
                            data: rec
                        }
                    },
                    mode: 'create',
                    app: Ext.getClassName(me)
                }).show();
            }
        }
    }
});