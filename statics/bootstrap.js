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

Ext.Loader.loadScript('finetrust/data/Dict.js');
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
    // TODO: hack the {Ext.data.reader.Reader} to handle global {success:false} event

    Beaux.setDisplayManager(null);
    Beaux.setDesktopManager(Beaux.desktop.Desktop);
    Beaux.boot();

});
