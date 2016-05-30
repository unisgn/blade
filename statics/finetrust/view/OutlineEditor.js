/**
 * Created by 0xFranCiS on May 29, 2016.
 */

Ext.define('Finetrust.view.OutlineEditor', {
    extend: 'Beaux.desktop.XWindow',
    // xtype: 'outlineEditor',

    requires: [
        'Ext.button.Button'
    ],

    closeAction: 'hide',


    // layout: 'auto',

    config: {
        readonly: false
    },


    initComponent: function () {
        var me = this,
            readonly = me.getReadonly();
        if (!readonly) {
            Ext.apply(me, {
                buttons: [{
                    text: '保存',
                    handler: 'on_btn_save',
                    scope: me
                }]
            });
        }

        me.callParent(arguments);

    },

    on_btn_save: function () {
        var me = this;
        if (!me.getReadonly()) {
            me.fireEvent('endEdit');
            me.close();
        }
    }

});