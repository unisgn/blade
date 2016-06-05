/**
 * Created by 0xFranCiS on May 20, 2016.
 */

Ext.define('Finetrust.model.AuditableEntity', {
    extend: 'Finetrust.model.BaseEntity',
    
    fields: [
        {name: 'created_at', type: 'date', dateFormat: 'timestamp'},
        {name: 'modified_date', type: 'date', dateFormat: 'timestamp'},
        {name: 'created_by', type: 'string', allowNull: true},
        {name: 'modified_by', type: 'string', allowNull: true}
    ]
});