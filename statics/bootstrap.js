Ext.log('start ext;');

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Beaux': 'beaux',
        'Finetrust': 'finetrust'
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
        contextmenu: function (e) {
            e.stopEvent();
        }
    });

    (function (Ext) {
        var reg = /"success":false/;
        Ext.Ajax.on({
            requestexception: function (conn, resp) {
                console.log(resp);
            },
            requestcomplete: function (conn, resp) {
                var data = resp.responseText;
                // prefer regular expression test over json decoder
                if (reg.test(data)) {
                    console.warn('private ajax protocol failure detected');
                }
            }
        });
    })(Ext);


    // TODO: hack the {Ext.data.reader.Reader} to handle global {success:false} event

    Beaux.setDisplayManager(null);
    Beaux.setDesktopManager(Beaux.desktop.Desktop);
    Beaux.boot();

});
