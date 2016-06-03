/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.model.CheckedPermission', {
    extend: 'Finetrust.model.Permission',
    fields:[
        {name: 'checked', type: 'boolean', persist: false}
    ]
});