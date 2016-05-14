/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
;Ext.define('Finetrust.model.BusinessEntity', {
    extend: 'Finetrust.model.BaseEntity',
    fields:[
        {name:'number',     type:'string'},
        {name:'code',       type:'string'},
        {name:'name',       type:'string'},
        {name:'alias',      type:'string'},
        {name:'brief',      type:'string'},
        {name:'search_field', type:'string'}
    ]
});