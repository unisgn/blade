/**
 * Created by 0xFranCiS on May 14, 2016.
 */

Ext.define('Finetrust.view.project.supervise.journal.Detail', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Boolean',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel',
        'Ext.util.Format',
        'Finetrust.model.ProjectSuperviseIssue',
        'Finetrust.model.ProjectSuperviseJournal'
    ],

    height: 520,

    layout: {
        type: 'auto'
    },

    bind: {
        title: '手工监督事项'
    },

    config: {
        readonly: false
    },
    items : Ext.create('Finetrust.view.supervisejournal.MonthView')
});