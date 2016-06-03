/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.widget.YesOrNoRadio', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'radio-yesorno',

    items: [
        {boxLabel: '是', name: 'yesorno', inputValue: 'Y'},
        {boxLabel: '否', name: 'yesorno', inputValue: 'N'}
    ],
    
    getValue() {
        var rv = this.callParent();
        console.log(rv);
        return 
    },
    
    setValue(v) {
        this.callParent({
            yesorno: v ? 'Y': 'N'
        });
    }
});