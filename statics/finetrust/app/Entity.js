/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.app.Entity', {
    extend: 'Beaux.Application',

    requires: [
        'Ext.app.ViewModel'
    ],


    inheritableStatics: {
        model: undefined,

        grid: undefined,

        singleGrid: true,

        xwin_grid: undefined,

        detail: undefined,
        detailViewModel: undefined,

        creator: undefined,
        updator: undefined,
        reader: undefined,


        launch: function (cfg) {
            var me = this, cfg = cfg || {};
            if ('id' in cfg || 'mode' in cfg) {
                me.launch_detail(cfg.id, cfg.mode);
            } else {
                me.launch_grid();
            }
        },

        launch_grid: function () {
            var me = this;
            if (me.singleGrid) {
                if (me.xwin_grid) {
                    me.xwin_grid.toFront();
                } else {
                    me.xwin_grid = Ext.create(me.grid, {
                        app: Ext.getClassName(me)
                    });
                    me.xwin_grid.on('destroy', () => {
                        me.xwin_grid = undefined;
                    });
                    me.xwin_grid.show();
                }
            } else {
                Ext.create(me.grid).show();
            }
        },

        launch_detail: function (id, mode) {
            var me = this;
            if (id) {
                switch (mode) {
                    case 'update':
                        me.update_detail(id, mode);
                        break;
                    case 'readonly':
                        me.readonly_detail(id, mode);
                        break;
                    default:
                        me.readonly_detail(id);
                }
            } else {
                me.create_detail();
            }
        },

        enter_detail: function (id, mode) {
            var me = this;
            if (me.detail) {
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
                    Ext.create(me.detail, {
                        viewModel: {
                            type: me.detailViewModel || 'default',
                            links: {
                                data: {
                                    type: me.model,
                                    create: true
                                }
                            }
                        },
                        mode: 'create',
                        app: Ext.getClassName(me)
                    }).show();
                }
            } else {
                console.warn('no detail class specified');
            }
        },

        create_detail: function () {
            var me = this;
            if (me.creator) {
                Ext.create(me.creator, {
                    viewModel: {
                        type: me.detailViewModel || 'default',
                        links: {
                            data: {
                                type: me.model,
                                create: true
                            }
                        }
                    },
                    app: Ext.getClassName(me)
                }).show();
            } else {
                me.enter_detail();
            }
        },

        update_detail: function (id, mode) {
            var me = this;
            if (me.updator) {
                Ext.create(me.updator, {
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
                me.enter_detail(id, mode);
            }
        },

        readonly_detail: function (id) {
            var me = this;
            if (me.reader) {
                Ext.create(me.reader, {
                    viewModel: {
                        type: me.detailViewModel || 'default',
                        links: {
                            data: {
                                type: me.model,
                                id: id
                            }
                        }
                    },
                    mode: 'readonly',
                    app: Ext.getClassName(me)
                }).show();
            } else if (me.updator) {
                me.update_detail(id, 'readonly');
            } else {
                me.enter_detail(id, 'readonly');
            }
        }

    }


});