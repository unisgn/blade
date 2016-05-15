/**
 * Created by 0xFranCiS on Apr 12, 2015.
 */
Ext.define('Finetrust.model.ProjectAccount', {
    extend: 'Finetrust.model.PrimeEntity',
    
    fields: [
        {name: 'acct_no', type: 'string'},
        {name: 'acct_name', type: 'string'},
        {name: 'acct_type', type: 'int'},
        {name: 'branch', type: 'string'},
        {name: 'open_date', type: 'date'},
        {name: 'close_date', type: 'date'}
    ]
});