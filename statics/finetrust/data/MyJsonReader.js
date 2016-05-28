/**
 * Created by 0xFranCiS on May 28, 2016.
 */

Ext.define('Finetrust.data.MyJsonReader', {
    extend: 'Ext.data.reader.Json',

    alias: 'reader.my-json',
    
    messageProperty: 'msg',
    rootProperty: 'data'
});