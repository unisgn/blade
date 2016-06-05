/**
 * Created by 0xFranCiS on May 30, 2016.
 */
Ext.define('Finetrust.model.Role', {
    extend: 'Finetrust.model.PrimeEntity',
    
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'flag', type: 'string'},
        {name: 'memo', type: 'string'}
    ]
    
});