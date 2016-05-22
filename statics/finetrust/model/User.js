/**
 * Created by 0xFranCiS on Mar 30, 2015.
 */
;Ext.define('Finetrust.model.User', {
    extend:'Finetrust.model.AuditableEntity',

    requires: [
        'Finetrust.model.NullGenerator'
    ],
    fields:[
        {name:'username', type:'string'},
        {name:'password', type:'string'},
        {name:'alias', type: 'string' }
    ],

    identifier: 'null',
    
    idProperty: 'username'
});