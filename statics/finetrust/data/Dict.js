/**
 * Created by 0xFranCiS on May 14, 2016.
 */

(function (Ext) {
    Ext.ns('Finetrust.data.Dict');
    var d = Finetrust.data.Dict;
    var dict_set = {
        contract_status:[
            {key: 0, text: '未授权'},
            {key: 1, text: '已授权'},
            {key: 2, text: '高级授权'}
        ],
        project_type: [
            {key: 0, text: '传统'},
            {key: 1, text: '非传统'}
        ],
        supervise_type: [
            {key:'0', text: '投资范围'},
            {key:'1', text: '投资限制'},
            {key:'2', text: '其他'}
        ]
    };

    var dict_map = {}, dm;

    Ext.Object.each(dict_set, function (k, v, o) {
        dm = {};
        Ext.Array.each(v, function (v, idx, len) {
            dm[v['key']] = v;
        });
        dict_map[k] = dm;
    });
    
    d.keyset = function (key) {
        return dict_set[key];
    };
    
    d.keymap = function (key) {
        return dict_map[key];
    };
    
    d.get_text = function (k, v) {
        var dd = dict_map[k];
        return dd && dd[v] ? dd[v]['text'] : '';
    };
    
    d.get_text_or = function (k, v, or) {
        var dd = dict_map[k];
        return dd && dd[v] ? dd[v]['text'] : or;
    };
    
    d.keyrenderer = function (k) {
        return function (v) {
            return d.get_text(k, v);
        }
    }
    
})(Ext);