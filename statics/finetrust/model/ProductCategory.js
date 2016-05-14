/**
 * Created by 0xFranCiS on Mar 29, 2015.
 */

Ext.define('Finetrust.model.ProductCategory', {
    extend: 'Finetrust.model.BaseTreeEntity',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'fullname', type: 'string', persist: false},
        {name: 'brief', type: 'string'}
    ]
});