/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */
;Ext.define('Finetrust.apps.UserHub',  {
    extend: 'Beaux.Application',
    
    statics: {
        launch: function (cfg) {
            var me = this;
            if (me.xwindow) {
                me.xwindow.toFront();
            } else {
                me.xwindow = Ext.create('Finetrust.lib.user.UserHub', cfg);
                me.xwindow.on({
                    beforedestory: function () {
                        me.xwindow = undefined;
                    },
                    scope: me
                });
                me.xwindow.show();
            }
        },
        xwindow: undefined
    }
    
});
