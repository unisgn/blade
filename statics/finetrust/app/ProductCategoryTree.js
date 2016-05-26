/**
 * Created by 0xFranCiS on May 13, 2016.
 */
Ext.define('Finetrust.app.ProductCategoryTree', {
    extend: 'Beaux.Application',
    
    requires: [
        'Beaux.desktop.XWindow',
        'Finetrust.view.productCategory.Grider'
    ],
    
    statics: {
        launch: function (cfg) {
            var me = this;
            if (me.xwin) {
                me.xwin.toFront();
            } else {
                me.xwin = Ext.create('Beaux.desktop.XWindow', {
                    title: '产品分类树',
                    items: Ext.create('Finetrust.view.productCategory.Grider')
                });
                me.xwin.on({
                    destroy: function () {
                        me.xwin = undefined;
                    }
                });
                me.xwin.show();
            }
        },
        
        xwin: undefined
    }
});