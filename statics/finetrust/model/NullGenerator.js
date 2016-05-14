/**
 * Created by 0xFranCiS on May 13, 2016.
 */

;Ext.define('Finetrust.model.NullGenerator', {
    extend: 'Ext.data.identifier.Generator',
    alias: 'data.identifier.null',
    generate: function () {
        return undefined; // prevent generating new id
    }
});