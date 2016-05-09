/**
 * Created by 0xFranCiS on Mar 30, 2015.
 */
;Ext.define('Finetrust.model.User', {
    extend:'Finetrust.model.BaseEntity',
    fields:[
        {name:'username', type:'string'},
        {name:'password', type:'string'}
    ]
});