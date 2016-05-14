/**
 * Created by 0xFranCiS on May 13, 2016.
 */
Ext.define('Finetrust.model.BaseTreeEntity', {
    extend: 'Finetrust.model.BaseEntity',

    
    fields:[
        {name: 'leaf', type: 'boolean', defaultValue: false, persist: false}
    ]
});