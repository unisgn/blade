/**
 * Created by 0xFranCiS on Apr 12, 2015.
 */
Ext.define('Finetrust.model.ProjectArchive', {
    extend: 'Finetrust.model.PrimeEntity',
    
    fields: [
        {name: 'detail', type: 'string'},
        {name: 'copies', type: 'int'},
        {name: 'is_copy', type: 'boolean'},
        {name: 'memo', type: 'string'}
    ]
});