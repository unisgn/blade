/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
;Ext.define('Finetrust.app.ProjectHub', {
    extend:'Beaux.Application',

    
    statics:{
        mapper: {
            basic: 'Finetrust.app.ProjectBase',
            essential: 'Finetrust.app.ProjectEssential',
            online: 'Finetrust.app.ProjectOnline',
            operators: 'Finetrust.app.ProjectOperators',
            operation: 'Finetrust.app.ProjectOperation',
            accounts: 'Finetrust.app.ProjectAccounts',
            supervise: 'Finetrust.app.ProjectSupervise',
            supervise_journal: 'Finetrust.app.ProjectSuperviseJournal',
            archive: 'Finetrust.app.ProjectArchive'

        },
        launch: function (cfg) {
            var cfg = cfg || {}, me = this, mode = cfg.mode || 'basic';

            mode in me.mapper && Beaux.launch(me.mapper[mode]);
        }
    }

});