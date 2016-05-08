/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */
;Ext.define('Finetrust.apps.User',  {
    extend: 'Beaux.Application',
    
    statics: {
        launch: function (cfg) {
            Ext.create('Finetrust.lib.user.UserViewer', cfg).show();
        }
    }
    
});
