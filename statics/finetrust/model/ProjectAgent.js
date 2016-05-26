/**
 * 
 * Created by 0xFranCiS on May 24, 2016.
 */

Ext.define('Finetrust.model.ProjectAgent', {
    extend: 'Finetrust.model.PrimeEntity',
    fields: [
        {name: 'corp_name', type: 'string'},
        {name: 'addr', type: 'string'},
        {name: 'legalman', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'contact', type: 'string'},
        {name: 'contact_phone', type: 'string'},
        {name: 'zipcode', type: 'string'},
        {name: 'project_id', type: 'string'}
    ]
});