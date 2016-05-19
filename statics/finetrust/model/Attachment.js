/**
 * Created by 0xFranCiS on May 19, 2016.
 */

Ext.define('Finetrust.model.Attachment', {
    extend: 'Finetrust.model.PrimeEntity',
    
    fields: [
        {name: 'fname', type: 'string'},
        {name: 'upload_date', type: 'date', dateFormat: 'U'}
    ]
});