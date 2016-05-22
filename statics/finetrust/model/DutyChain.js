/**
 * Created by 0xFranCiS on May 17, 2016.
 */

;Ext.define('Finetrust.model.DutyChain', {
    extend:'Finetrust.model.BaseEntity',
    fields:[
        {name:'code', type:'string'},
        {name:'name', type:'string'},
        {name:'brief', type: 'string' },
        {name:'member_csv', type: 'string'},
        {name:'member_text_csv', type: 'string', persist: false}
    ]
});