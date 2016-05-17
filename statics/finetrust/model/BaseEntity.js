/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
Ext.define('Finetrust.model.BaseEntity', {
    extend: 'Finetrust.model.PrimeEntity',
    
    fields:[
        {name:'archived', type:'boolean', defaultValue:false, persist: false},
        {name:'active', type:'boolean', defaultValue: true, persist: false}
    ]
    
});