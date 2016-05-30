/**
 * Created by 0xFranCiS on May 24, 2016.
 */

Ext.define('Finetrust.model.ProjectPreAccount', {
    extend: 'Finetrust.model.PrimeEntity',
    
    fields:[
        {name: 'acct_no', type: 'string', validators: {type:'format', matcher: /\d{3}/}},
        {name: 'acct_name', type: 'string'},
        {name: 'branch', type: 'string'},
        {name: 'is_primary', type: 'boolean', persist: false},
        {name: 'project_id', type: 'string'}
    ]
});