/**
 * Created by 0xFranCiS on May 31, 2016.
 */
Ext.define('Finetrust.widget.RadioGroup', {
    extend: 'Ext.form.RadioGroup',

    xtype:'my-radiogroup',



    getTrueValue: function () {
        var me = this, boxes = me.getBoxes();
        var value;
        Ext.each(boxes, function (v) {
            if (v.getValue()) {
                value = v.inputValue;
                return false;
            }
        });
        console.log(value);
        return value;
    },

    setTrueValue: function(v) {
         
    }

});