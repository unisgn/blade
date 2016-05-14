/**
 * Created by 0xFranCiS on May 10, 2016.
 */
Ext.define('Finetrust.view.QueryPanel', {

    extend: 'Beaux.desktop.XWindow',

    // closable: false,
    closeAction: 'hide',


    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            fbar: {
                items: [{
                    type:'button',
                    text: 'RESET',
                    handler: function () {
                        var vm = me.getViewModel();
                        var init = vm.getInitialConfig().data;
                        vm.setData(init);
                    }
                },{
                    type: 'button',
                    text: 'Query',
                    handler: function () {
                        me.fireEvent('criteriaready');
                    }
                }]
            }
        });

        me.callParent();
    },

    getFilters: function () {
        
    }
});