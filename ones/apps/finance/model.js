(function(window, angular, ones, io){
    'use strict';
    angular.module('ones.app.finance.model', [
        'ones.app.finance.receivables',
        'ones.app.finance.payables'
    ])
        .service('Finance.FinanceAccountAPI', [
            'ones.dataApiFactory',
            function(dataAPI) {
                this.resource = dataAPI.getResourceInstance({
                    uri: "finance/financeAccount",
                    extra_methods: ['api_query']
                });

                this.config = {
                    app: "finance",
                    module: "financeAccount",
                    table: "finance_account",
                    fields: {
                        balance: {
                            get_display: function(value, item) {
                                return to_decimal_display(value);
                            }
                        }
                    }
                };
            }
        ])
        .service('Finance.FinanceStreamlineAPI', [
            'ones.dataApiFactory',
            '$filter',
            function(dataAPI, $filter) {

                this.resource = dataAPI.getResourceInstance({
                    uri: "finance/financeStreamline",
                    extra_methods: ['api_query']
                });

                this.config = {
                    app: "finance",
                    module: "financeStreamline",
                    table: "finance_streamline",
                    fields: {
                        amount: {
                            cell_filter: "to_money_display",
                            grid_fixed: true
                        },
                        payment_method: {
                            grid_fixed: true,
                            data_source: 'Home.CommonTypeAPI',
                            data_source_query_param: {
                                _mf: 'module',
                                _mv: 'finance_payment_method'
                            }
                        },
                        direction: {
                            cell_filter: 'to_balance_direction_icon',
                            width: 80,
                            label: _('finance.Balance Direction'),
                            align: 'center',
                            grid_fixed: true
                        },
                        finance_account_id: {
                            data_source: 'Finance.FinanceAccountAPI',
                            grid_fixed: true
                        },
                        user_info_id: {
                            cell_filter: "to_user_fullname"
                        }
                    },
                    filters: {
                        finance_account_id: {
                            type: 'link'
                        },
                        direction: {
                            type: 'link'
                        },
                        payment_method: {
                            type: 'link'
                        }
                    },
                    addable: false,
                    editable: false,
                    list_hide: ['source_id']
                };

                this.config.fields.direction.data_source =  [
                    {label: $filter('to_balance_direction_icon')(1), value: 1},
                    {label: $filter('to_balance_direction_icon')(2), value: 2}
                ]

            }
        ])
		.service('Finance.StatementAPI', [
		    'ones.dataApiFactory',
		    '$filter',
		    function(dataAPI, $filter) {
		
		        /* this.resource = dataAPI.getResourceInstance({
		            uri: "finance/statement",
		            extra_methods: ['api_query']
		        }); */
				
				this.resource = 'finance_statement_mock';
				
		        this.config = {
		            app: "finance",
		            module: "statement",
		            table: "finance_statement",
		            fields: {
						ship_id:{
		                    search_able: true,
		                    grid_fixed: true,
							label:'船号'
		                },
						order_id: {
						    search_able: true,
						    grid_fixed: true,
							label:'发货单id'
						},
						customer_id:{
							search_able: true,
							grid_fixed: true,
							label:'用户id'
						},
						type:{
							label: '产品类型',
						},
						created: {
						    widget: 'datetime',
						},
						dispatch_weight: {
							label: '发货吨位',
						    get_display: function(value, item) {
						        return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
						    }
						},
						final_weight: {
							label: '结算吨位',
						    get_display: function(value, item) {
						        return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
						    }
						},
						unit_price: {
						    label: '单价',
						},
						total_price:{
							label: '总价',
							get_display: function(value, item) {
							    return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
							}
						},
						remainder:{
							label: '余额',
							get_display: function(value, item) {
							    return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
							}
						},
						dispatch_place: {
						    label: '装货地点',
						},
						remark: {
						    label: '备注',
						},
		            },
		            addable: false,
		            editable: false,
		            list_hide: []
		        };
		
		
		    }
		])
    ;

})(window, window.angular, window.ones, window.io);