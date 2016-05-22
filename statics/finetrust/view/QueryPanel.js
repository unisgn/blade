/**
 * Created by 0xFranCiS on May 10, 2016.
 */
Ext.define('Finetrust.view.QueryPanel', {

    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.button.Button',
        'Finetrust.controller.QueryPanel'
    ],

    controller: 'query-panel',

    // closable: false,
    closeAction: 'hide',


    /**
     * @event criteriaready
     */

    fbar: {
        items: [{
            type: 'button',
            text: 'RESET',
            handler: 'on_btn_reset'
        }, {
            type: 'button',
            text: 'Query',
            handler: 'on_btn_query'
        }]
    },

    createCriteria: function () {

    }
    
});