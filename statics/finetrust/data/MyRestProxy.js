/**
 * Created by 0xFranCiS on May 28, 2016.
 */
Ext.define('Finetrust.data.MyRestProxy', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.my-rest',

    requires: [
        'Finetrust.data.MyJsonReader'
    ],

    reader: {
        type: 'my-json'
    }
});