/**
 * Created by 0xFranCiS on May 20, 2016.
 */

Ext.define('Finetrust.model.AuditableEntity', {
    extend: 'Finetrust.model.BaseEntity',
    
    fields: [
        {name: 'last_modified_date', type: 'date', dateFormat: 'timestamp'}
    ]
});