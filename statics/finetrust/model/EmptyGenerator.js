/**
 * Created by 0xFranCiS on Jun 04, 2016.
 */
Ext.define('Finetrust.model.EmptyGenerator', {
    extend: 'Ext.data.identifier.Generator',
    alias: 'data.identifier.empty',
    generate: function () {
        return ''; // prevent generating new id
    }
});