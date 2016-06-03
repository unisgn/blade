/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.widget.YesOrNoCombo', {
    extend: 'Ext.form.field.ComboBox',
    
    xtype: 'combo-yesorno',
    
    store: {
        fields: ['value', 'text'],
        data: [
            {value: true, text: '是'},
            {value: false, text: '否'}
        ]
    },
    
    valueField: 'value',
    displayField: 'text'
});