/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
Ext.define('Finetrust.model.BaseEntity', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.identifier.Uuid'
    ],
    
    fields:[
        // {name:'createdDate', type:'int', defaultValue: Date.now()},
        // {name:'lastModifiedDate', type:'int', defaultValue: Date.now()},
        {name:'version', type:'int'},
        {name:'archived', type:'boolean', defaultValue:false, persist: false},
        {name:'active', type:'boolean', defaultValue: true, persist: false}
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