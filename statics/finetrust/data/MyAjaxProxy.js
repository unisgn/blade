/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.data.MyAjaxProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.my-ajax',

    requires: [
        'Finetrust.data.MyJsonReader'
    ],

    reader: {
        type: 'my-json'
    }
});