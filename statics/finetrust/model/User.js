/**
 * Created by 0xFranCiS on Mar 30, 2015.
 */
;Ext.define('Finetrust.model.User', {
    extend:'Finetrust.model.AuditableEntity',

    requires: [
        'Finetrust.model.EmptyGenerator'
    ],
    fields:[
        {name:'name', type:'string'},
        {name:'password', type:'string'},
        {name:'alias', type: 'string' },
        {name:'org_fk', type: 'string', allowNull: true },
        {name:'memo', type: 'string' }
    ],

    identifier: 'empty'
    
    // idProperty: 'username'
});