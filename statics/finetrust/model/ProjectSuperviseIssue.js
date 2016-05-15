/**
 * Created by 0xFranCiS on Apr 12, 2015.
 */
Ext.define('Finetrust.model.ProjectSuperviseIssue', {
    extend: 'Finetrust.model.PrimeEntity',
   
    fields:[
        {name: 'issue_type', type: 'string'},
        {name: 'content', type: 'string'},
        {name: 'artificial', type: 'boolean'}
    ]
});