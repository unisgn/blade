/**
 * Created by 0xFranCiS on May 14, 2016.
 */

(function (Ext) {
    Ext.ns('Finetrust.data.Dict');
    var d = Finetrust.data.Dict;

    /**
     * predefined fixed application aware dicts
     * @type {object}
     */
    var DICT_SET = {
        contract_status: {
            values: [
                {value: '1', text: '未授权'},
                {value: '2', text: '已授权'},
                {value: '3', text: '高级授权'}
            ]
        },
        project_type: {
            values: [
                {value: '1', text: '传统'},
                {value: '2', text: '非传统'}
            ]
        },
        supervise_type: {
            values: [
                {value: '1', text: '投资范围'},
                {value: '2', text: '投资限制'},
                {value: '3', text: '其他'}
            ]
        }
    };

    var DICT_MAP;


    function parse_key_set(ks) {
        var ret = {}, dm;
        Ext.Object.each(ks, function (k, v, o) {
            dm = {};
            Ext.Array.each(v.values, function (v, idx, len) {
                dm[v['value']] = v;
            });
            ret[k] = {values: dm};
        });
        return ret;
    }

    DICT_MAP = parse_key_set(DICT_SET);

    /**
     * usually used by combobox store's inline data
     * @param key
     * @returns {*}
     */
    d.keyset = key => key in DICT_SET ? DICT_SET[key].values : undefined;

    /**
     * usually used by grid column renderer
     * @param key
     * @returns {*}
     */
    d.keymap = key => key in DICT_MAP ? DICT_MAP[key].values : undefined;

    d.get_text = (k, v, or = '') => k in DICT_MAP && v in DICT_MAP[k]['values'] ? DICT_MAP[k]['values'][v]['text'] : or;

    /**
     * a handy column renderer generator, usually used by grid column renderer
     * @param {String} k the dict key/group name
     * @returns {Function} an renderer function
     */
    d.keyrenderer = k => v => d.get_text(k, v);


    /**
     * 
     * @param key
     * @param delimiter
     * @returns {Function} an renderer function
     */
    d.spliterkeyrenderer = (key, delimiter = ',') =>
        key in DICT_MAP ?
            v => v ? v.split(delimiter).map(e => DICT_MAP[key]['values'][e]['text']).join(',') : v
            : v => v;

    var stores = [];

    var uuid = new Ext.data.identifier.Uuid();


    d.dictstore = dictname => {
        if (dictname in DICT_SET) {
            var id = uuid.generate();
            stores.push({
                dict: dictname,
                id: id,
                type: 0
            });
            return Ext.create('Ext.data.Store', {
                fields: ['value', 'text'],
                data: d.keyset(dictname) || [],
                storeId: id
            });
        }
    };


    d.nullabledictstore = (dictname, nulltext, nullvalue = '') => {
        var item = [{value: nullvalue, text: nulltext}];
        var data = item.concat(d.keyset(dictname) || []);
        var id = uuid.generate();
        stores.push({
            dict: dictname,
            id: id,
            data: item,
            type: 1
        });
        return Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data,
            storeId: id
        });
    };

    // TODO: pull database dicts, usually user definedable


    d.init_remote_dict = callback => {
        new Promise(function (resolve, reject) {
            Ext.Ajax.request({
                url: '/api/data/pull_app_dict',
                success: resp => {
                    resolve(resp);
                },
                failure: resp => {
                    reject(resp);
                }
            });
        }).then(function (resp) {
            var data = Ext.JSON.decode(resp.responseText).data;
            Ext.apply(DICT_SET, data);
            Ext.apply(DICT_MAP, parse_key_set(data));
            if (callback) {
                callback();
            }
        }).catch(function (r) {
            console.log(r);
        });
    };

    // d.init_remote_dict();

    // TODO: only need to update remote fetched dict
    function update_storemanager_cache() {
        var s;

        Ext.Array.each(stores, v => {
            s = Ext.data.StoreManager.getByKey(v.id);
            if (s) {
                if (v.type === 0) {
                    s.setData(DICT_SET[v.dict].values);
                } else if (v.type === 1) {
                    s.setData(v.data.concat(DICT_SET[v.dict].values));
                }
            }
        });
    }

    d.pull_remote_dict = () => {
        d.init_remote_dict(update_storemanager_cache);
    };

})(Ext);