/**
 * Created by 0xFranCiS on May 29, 2016.
 */
Ext.define('Finetrust.view.RowEditGrid', {
    extend: 'Finetrust.view.InlineEditGrid',

    xtype: 'rowEditGrid',


    requires: [
        'Ext.grid.plugin.RowEditing'
    ],


    // controller: 'rowEditableGrid',

    config: {
        readonly: false,
    },

    plugins: [{
        ptype: 'rowediting',
        clicksToEdit: 1
    }],

    selModel: 'rowmodel'

});