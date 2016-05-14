/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
;Ext.define('Finetrust.app.ProjectHub', {
    extend:'Beaux.Application',
    
    requires: [
        'Finetrust.view.project.BasicGrid'
    ],
    
    statics:{
        mapper: {
            basic: 'Finetrust.view.project.BasicGrid'
        },
        launch: function (cfg) {
            var mycfg = {
                mode: 'basic'
            }, me = this;
            Ext.apply(mycfg, cfg);

            me.mapper[mycfg.mode] && Ext.create(me.mapper[mycfg.mode]).show();
        }
    }

});