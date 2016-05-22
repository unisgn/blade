/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */
;Ext.define('Finetrust.app.DutyChainGrider',  {
    extend: 'Beaux.Application',

    requires: [
        'Finetrust.view.dutyChain.Grider'
    ],

    statics: {
        launch: function (cfg) {
            var me = this;
            if (me.xwindow) {
                me.xwindow.toFront();
            } else {
                me.xwindow = Ext.create('Finetrust.view.dutyChain.Grider');
                me.xwindow.on({
                    destroy: function () {
                        me.xwindow = undefined;
                    }
                });
                me.xwindow.show();
            }
        },
        xwindow: undefined
    }
    
});
