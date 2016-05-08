/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
;Ext.define('Finetrust.model.BusinessEntity', {
    extend: 'Finetrust.model.AbstractEntity',
    fields:[
        {name:'number',     type:'string'},
        {name:'code',       type:'string'},
        {name:'name',       type:'string'},
        {name:'alias',      type:'string'},
        {name:'brief',      type:'string'},
        {name:'searchText', type:'string'}
    ]
});