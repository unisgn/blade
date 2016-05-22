/**
 * Created by 0xFranCiS on May 21, 2016.
 */

Ext.define('Finetrust.viewmodel.EntityDetail', {
    extend: 'Ext.app.ViewModel',

    formulas: {
        hide_tbar: function (get) {
            return get('readonly') || get('instantEdit');
        }
    }

});