/**
 * Created by 0xFranCiS on Mar 23, 2015..
 */
;Ext.define('Finetrust.model.Project', {
    extend: 'Finetrust.model.BusinessEntity',
    requires: [
        'Finetrust.data.Dict'
    ],
    fields:[
        {name: 'proj_type', type:'string'},
        {name: 'proj_status', type: 'string'},
        {name: 'category_id', type: 'string', allowNull: true},
        {name: 'contract_no', type: 'string'},
        {name: 'contract_status', type: 'string'},
        {name: 'proj_mgr', type: 'string'},
        {name: 'cust_mgr', type: 'string'},
        {name: 'fee_rate', type: 'number'},
        {name: 'estimate_scale', type: 'number'},
        {name: 'period', type: 'int'},
        {name: 'estimate_setup_date', type: 'date'},
        {name: 'setup_date', type:'date', dateFormat: 'timestamp'},
        {name: 'create_date', type:'date', dateFormat: 'timestamp'},
        {name: 'proj_status', type:'string', persist: false},
        {name: 'intro_org_id', type:'string', allowNull: true},
        {name: 'op_org_id', type:'string', allowNull: true},
        {name: 'spv_org_id', type:'string', allowNull: true},
        {name: 'online_date', type:'date'},
        {name: 'online_scale', type:'number'},
        {name: 'online_memo', type:'string'},
        {name: 'online_status', type:'int'},
        {name: 'acct_num', type:'string'},
        {name: 'asset_code', type:'string'},
        {name: 'trustee_corp', type:'string'},
        {name: 'trustee_contact', type:'string'},
        {name: 'due_date', type:'date'},
        {name: 'open_date', type:'date'},
        {name: 'invest_advisor', type:'string'},
        {name: 'lasts_month', type:'int'},
        {name: 'trans_num', type:'string'},
        {name: 'trans_person', type:'string'},
        {name: 'trans_date', type:'int'},
        {name: 'trans_receipt', type:'string'},
        {name: 'prime_pre_account_fk', type:'string'},
        {name: 'clerks_operator', type:'string'},
        {name: 'clerks_checker', type:'string'},
        {name: 'clerks_director', type:'string'}
    ]
});