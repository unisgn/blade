/**
 * Created by 0xFranCiS on May 14, 2016.
 */

Ext.define('Finetrust.model.PrimeEntity', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.identifier.Uuid',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    fields: [
        {name:'version', type:'int'}
    ],
    
    versionProperty: 'version',
    
    identifier:'uuid',
    schema: {
        namespace: 'Finetrust.model',
        proxy:{
            type:'rest',
            url:'../api/{entityName}',
            // format: 'json',
            reader:{
                type:'json',
                rootProperty: 'data',
                messageProperty: 'msg'
            }
        }
    }
    
});