/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.view.CellEditGrid', {
    extend: 'Finetrust.view.InlineEditGrid',

    xtype: 'cellEditGrid',


    requires: [
        'Ext.grid.plugin.CellEditing'
    ],


    // controller: 'rowEditableGrid',

    config: {
        readonly: false,
        menus: undefined
    },
    
    initComponent: function () {
        var me = this;
        me.menus = Ext.create('Ext.util.HashMap');
        
        me.callParent();
    },

    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1
    }],

    selModel: 'cellmodel'

});