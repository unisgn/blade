/**
 * Created by 0xFranCiS on May 30, 2016.
 */

Ext.define('Finetrust.app.Role', {
    extend: 'Finetrust.app.Entity',

    requires: [
        'Ext.data.TreeStore',
        'Finetrust.data.MyAjaxProxy',
        'Finetrust.model.CheckedPermission',
        'Finetrust.model.Role',
        'Finetrust.view.role.Creator',
        'Finetrust.view.role.Grid',
        'Finetrust.view.role.Updator'
    ],

    inheritableStatics: {
        model: 'Finetrust.model.Role',
        grid: 'Finetrust.view.role.Grid',
        creator: 'Finetrust.view.role.Creator',
        updator: 'Finetrust.view.role.Updator',

        update_detail: function (id, mode) {
            var me = this;
            Ext.create(me.updator, {
                viewModel: {
                    links: {
                        data: {
                            type: me.model,
                            id: id
                        }
                    }
                },
                mode: mode,
                roleId: id
            }).show();
        }
    }
});