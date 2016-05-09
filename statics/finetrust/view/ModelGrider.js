/**
 * Created by 0xFranCiS on Mar 23, 2015.
 *
 * create an GRID by the given STORE.
 * input: store, display fields ( and width), filter fields (and group fields)
 * output: the grid (fancy infinite style), and a filter/grouping sub panel
 */
;Ext.define('Finetrust.view.ModelGrider', {
    extend: 'Ext.grid.Panel',

    xtype: 'model-grid',

    requires: [
        'Finetrust.controller.GridController'
    ],

    controller: 'gridcontroller',

    listeners: {
        itemcontextmenu: 'on_itemcontextmenu',
        itemdblclick: 'on_itemdblclick',
        containercontextmenu: 'on_containercontextmenu',
        afterrender: 'on_afterrender',
        criteriaready: 'on_criteria_ready',
        scope: 'controller' // IMPORTANT
    },
    
 
    /**
     * @type {Beaux.desktop.XWindow}
     */
    

    config: {
        queryPanel: undefined
    },
    

    initComponent: function () {
        var me = this;

        me.callParent();

        if (me.queryPanel) {
            me.queryPanel.on({
                criteriaready: function () {
                    me.fireEvent('criteriaready');
                    me.queryPanel.hide();
                },
                scope: me
            });
        }

    }

});