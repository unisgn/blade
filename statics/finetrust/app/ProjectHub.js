/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
;Ext.define('Finetrust.app.ProjectHub', {
    extend:'Beaux.Application',
    
    requires: [
        'Finetrust.view.project.BasicGrid',
        'Finetrust.view.project.EssentialGrid',
        'Finetrust.view.project.OnlineGrid',
        'Finetrust.view.project.OperatorsGrid',
        'Finetrust.view.project.OperationGrid',
        'Finetrust.view.project.AccountsGrid',
        'Finetrust.view.project.SuperviseGrid',
        'Finetrust.view.project.SuperviseJournalGrid',
        'Finetrust.view.project.ArchiveGrid'
    ],
    
    statics:{
        mapper: {
            basic: 'Finetrust.view.project.BasicGrid',
            essential: 'Finetrust.view.project.EssentialGrid',
            online: 'Finetrust.view.project.OnlineGrid',
            operators: 'Finetrust.view.project.OperatorsGrid',
            operation: 'Finetrust.view.project.OperationGrid',
            accounts: 'Finetrust.view.project.AccountsGrid',
            supervise: 'Finetrust.view.project.SuperviseGrid',
            supervise_journal: 'Finetrust.view.project.SuperviseJournalGrid',
            archive: 'Finetrust.view.project.ArchiveGrid'

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