/**
 * Created by 0xFranCiS on May 12, 2016.
 */

Ext.define('Finetrust.controller.UserGrid', {
    extend: 'Finetrust.controller.EntityGrid',

    alias: 'controller.user-grid',
    
    requires: [
        'Finetrust.app.UserDetail'
    ],

    /**
     *
     * @param {String|Number} [id] - the id of the record
     * @param {Boolean} [readonly] - readonly mode
     */
    launch_detail: function (id, readonly) {
        Beaux.launch('Finetrust.app.UserDetail', {
            id: id,
            readonly: readonly
        });
    }

});