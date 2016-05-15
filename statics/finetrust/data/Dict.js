/**
 * Created by 0xFranCiS on May 14, 2016.
 */
Ext.define('Finetrust.data.Dict', {
    singleton: true,

    dicts: {
        contract_status:[
            {key: 0, text: '未授权'},
            {key: 1, text: '已授权'},
            {key: 2, text: '高级授权'}
        ],
        project_type: [
            {key: 0, text: '传统'},
            {key: 1, text: '非传统'}
        ]
    },

    /**
     *
     * @param key
     * @returns {*}
     */
    get: function (key) {
        return this.dicts[key];
    }
});