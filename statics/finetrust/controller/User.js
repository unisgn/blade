/**
 * Created by 0xFranCiS on May 09, 2016.
 */

Ext.define('Finetrust.controller.User', {
    extend: 'Finetrust.controller.DetailController',
    alias: 'controller.user',

    on_save: function () {
        console.log('on my save');
        this.callParent();
    }
});