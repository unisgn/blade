/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
;Ext.define('Finetrust.apps.ProjectHub', {
    extend:'Beaux.Application',
    statics:{
        launch: function (cfg) {
            var me = this;
            if (me.instance) {
                me.instance.xwindow.toFront();
            } else {
                me.instance = new this(cfg);
                me.instance.xwindow.show();
            }
        },
        instance: undefined
    },

    /**
     * @type {Finetrust.lib.projectHub.XWindow}
     */
    xwindow: undefined,

    constructor: function (cfg) {
        var me = this;
        me.initXWindow(cfg);
        me.callParent(cfg);
    },

    initXWindow: function (cfg) {
        var me = this;
        me.xwindow = Ext.create('Finetrust.lib.projectHub.XWindow', cfg);
        me.xwindow.on({
            destroy: function () {
                me.fireEvent('terminate');
            },
            scope: me
        });
    },

    terminate: function () {
        var me = this;
        me.callParent();
        me.self.instance = undefined;
        //TODO implement destroy xwindow
    }
});