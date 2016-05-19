/**
 * Created by 0xFranCiS on Apr 12, 2015.
 */
Ext.define('Finetrust.model.ProjectSuperviseJournal', {
    extend: 'Finetrust.model.PrimeEntity',

    fields: [
        {name: 'content', type: 'string'},
        {name: 'jnl_date', type: 'date', dateFormat: 'timestamp'},
        {name: 'memo', type: 'string'}
    ]
});