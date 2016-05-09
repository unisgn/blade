/**
 * Created by 0xFranCiS on Apr 26, 2015.
 */
;Ext.define('Finetrust.lib.ApplicationFactory', {
    singleton: true,

    models:['User'],

    namespace: 'Finetrust.app.',

    constructor: function () {
        var me = this;
        console.log('constructor method');
        Ext.each(me.models, function (item, idx) {
            Ext.define(me.namespace + item, {
                extend:'Beaux.Application',
                launch: function () {
                    var me = this;
                    console.log(me);
                    console.log('launch ' + me.getName());
                }
            });
        });
    },

    produce: function () {
        console.log('singleton factory');
    }
});