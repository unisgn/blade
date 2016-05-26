/**
 * Created by 0xFranCiS on May 22, 2016.
 */
Ext.define('Finetrust.model.Organization', {
    extend: 'Finetrust.model.BaseTreeEntity',
    
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'brief', type: 'string'}
    ]
});