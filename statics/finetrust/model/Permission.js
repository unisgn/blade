/**
 * Created by 0xFranCiS on May 30, 2016.
 */
Ext.define('Finetrust.model.Permission', {
    extend: 'Finetrust.model.PrimeEntity',

    fields: [
        {name: 'code', type: 'string'},
        {name: 'memo', type: 'string'},
        {name: 'leaf', type: 'boolean'}
    ]
});