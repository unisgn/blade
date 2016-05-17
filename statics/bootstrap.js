Ext.log('start ext;');

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Beaux': 'beaux',
        'Finetrust':'finetrust'
    }
});


// Ext.Loader.loadScript('beaux/boot/override/override.js');

Ext.Loader.loadScript('beaux/Beaux.js');


// doesn't work on extjs5
/*Ext.getDoc().on({
    contextmenu: function(e) { e.stopEvent(); }
});*/

Ext.require('Beaux.login.LoginMgr');
Ext.require('Beaux.desktop.Desktop');

Ext.onReady(function () {


    // disable browser oncontextmenu event
    Ext.getBody().on({
        contextmenu: function(e) {
            e.stopEvent();
        }
    });

    Ext.Ajax.on({
        requestexception: function (conn, resp, opt) {
            console.log(resp);
        }
    });

    Beaux.setDisplayManager(null);
    Beaux.setDesktopManager(Beaux.desktop.Desktop);
    Beaux.boot();

});
