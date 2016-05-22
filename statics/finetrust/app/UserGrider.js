/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */
;Ext.define('Finetrust.app.UserGrider',  {
    extend: 'Beaux.Application',

    requires: [
        'Beaux.desktop.XWindow',
        'Finetrust.view.user.Grider'
    ],
    
    statics: {
        launch: function (cfg) {
            var me = this;
            if (me.xwindow) {
                me.xwindow.toFront();
            } else {
                me.xwindow = Ext.create('Beaux.desktop.XWindow', {
                    title: '用户管理',
                    items: Ext.create('Finetrust.view.user.Grider')
                });
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
