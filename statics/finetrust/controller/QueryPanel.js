/**
 * Created by 0xFranCiS on May 20, 2016.
 */
Ext.define('Finetrust.controller.QueryPanel', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.query-panel',
    
    on_btn_reset: function () {
        
    },
    
    on_btn_query: function () {
        this.getView().fireEvent('criteriaready');
    }
    
});