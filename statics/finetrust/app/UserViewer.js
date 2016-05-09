/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.app.UserViewer', {
    extend: 'Beaux.Application',

    statics: {
        launch: function (cfg) {
            var _cfg = {
                viewModel: {
                    data: {
                        username: 'big',
                        password: '***'
                    }
                },
                readonly: true
            };
            Ext.create('Finetrust.view.user.Detail', _cfg).show();
        }
    }
});