/**
 * Created by 0xFranCiS on May 17, 2016.
 */

Ext.define('Finetrust.app.Uploader', {
    extend: 'Beaux.Application',

    requires: [
        'Beaux.desktop.XWindow',
        'Finetrust.widget.FileGrid'
    ],

    statics: {
        launch: function () {
            Ext.create('Beaux.desktop.XWindow', {
                items: [Ext.create('Finetrust.widget.FileGrid', {

                })]
            }).show();
        }
    }

});