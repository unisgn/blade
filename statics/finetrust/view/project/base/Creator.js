/**
 * Created by 0xFranCiS on May 28, 2016.
 */
Ext.define('Finetrust.view.project.base.Creator', {
    extend: 'Beaux.desktop.XWindow',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.ComboBox'
    ],


    title: '新建项目',

    items: {
        xtype: 'form',
        bodyPadding: 5,
        defaultType: 'textfield',
        defaults: {
            validateBlank: true
        },
        items: [{
            name: 'name',
            fieldLabel: '名称',
            allowBlank: false,
            bind: '{data.name}'
        }, {
            name: 'proj_type',
            fieldLabel: '类型',
            allowBlank: false,
            xtype: 'combobox',
            store: Finetrust.data.Dict.dictstore('project_type'),
            valueField: 'value',
            displayField: 'text',
            bind: '{data.proj_type}'
        }],
        buttons: [{
            // formBind: true,
            text: '创建',
            handler: (cmp) => {
                var win = cmp.up('window'), data = win.getViewModel().get('data');
                data.save({
                    success: () => {
                        Beaux.launch('Finetrust.app.ProjectBase', {
                            id: data.getId(),
                            mode: 'update'
                        });
                        win.close();
                    }
                });
            }
        }]
    }
});