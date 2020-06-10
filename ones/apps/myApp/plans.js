(function(window, angular, ones, io){
    /*
     * @app MyApp
     * @author laofahai@TEam Swift
     * @link http://ng-erp.com
     * */
    'use strict';
	console.log("xx");
    angular.module('ones.app.myApp.plans', ['ones.billModule'])
        .config(['$routeProvider', function($route) {
			console.log("test");
            $route
                .when('/myApp/plans/add/bill', {
                    controller : 'MyAppPlansBillCtrl',
                    templateUrl: appView('plans_edit.html')
                })
                .when('/myApp/plans/edit/bill/:id', {
                    controller : 'MyAppPlansBillCtrl',
                    templateUrl: appView('plans_edit.html')
                })
                .when('/myApp/plans/:action/bill/:id', {
                    controller : 'MyAppPlansBillCtrl',
                    templateUrl: appView('plans_edit.html')
                })
                .when('/myApp/plans/:action/bill/:id/node/:node_id', {
                    controller : 'MyAppPlansBillCtrl',
                    templateUrl: appView('plans_edit.html')
                })
            ;
        }])
        .controller('MyAppPlansBillCtrl', [
            '$scope',
            '$timeout',
            'MyApp.PlansAPI',
            'MyApp.PlansDetailAPI',
            'Product.ProductAPI',
            'Bpm.WorkflowAPI',
            'BillModule',
            '$routeParams',
            '$q',
            '$injector',
            'RootFrameService',
            '$parse',
            function($scope, $timeout, plan_api, plan_detail_api, product_api,
                     workflow_api, bill, $routeParams, $q, $injector, RootFrameService, $parse) {
				console.log("test");
                if(!$routeParams.id) {
                    $scope.bill_meta_data = {
                        start_time: new Date(moment().format()),
						end_time: new Date(moment().format()),
                        user_info_id: ones.user_info.id
                    };
                } else {
                    $scope.bill_meta_data = {};
                }

                if($routeParams.id) {
                    $scope.is_edit = true;
                }

                // 产品属性
                /* if(is_app_loaded('productAttribute')) {
                    $injector.get('ProductAttribute.ProductAttributeAPI').assign_attributes(order_detail_api);
                } */

                // bill基本配置
                $scope.bill_config = {
                    model: plan_api,
                    subject: "装运计划",
                    bill_no: {
                        value: generate_bill_no('XS')
                    }
                };

                switch($routeParams.action) {
                    case 'view':
                        $scope.is_view = true;
                        $scope.bill_meta_data.locked = true;
                        break;
                }

                // 查询当前库存
               /* $scope.fetch_stock_quantity = function(row_data, row_scope, row_index) {
                    if(is_app_loaded('storage')) {
                        $injector.get('Storage.StockAPI').get_stock_quantity(row_data[row_index]).then(function(response_data) {
                            var getter = $parse('bill_rows['+row_index+'].stock_quantity__label__');
                            getter.assign(row_scope, to_decimal_display(response_data.quantity_balance));

                            var unit_measure_result = to_product_measure_unit(product_api, $q, row_data[row_index]);
                            var after_getter = $parse('bill_rows['+row_index+'].stock_quantity__after__');
                            if(typeof unit_measure_result === 'object') {
                                unit_measure_result.then(function(measure) {
                                    after_getter.assign(row_scope, measure);
                                });
                            } else if(typeof unit_measure_result === 'string') {
                                after_getter.assign(row_scope, unit_measure_result);
                            }
                        });
                    }
                }; */
				//合计
                var total_able_fields = [];
                angular.forEach(plan_detail_api.config.fields, function(config, field) {
                    if(config.total_able) {
                        total_able_fields.push(field);
                    }
                });

                // 计算小计
                $scope.re_calculate_subtotal = function(rows, row_scope, row_index) {
                    bill.common_methods.re_calculate_subtotal($scope, rows, row_scope, row_index);
                    $scope.re_calculate_total(rows);
                };

                // 计算合计
                $scope.re_calculate_total = function(rows, update_net_receive) {
                    bill.common_methods.re_calculate_total($scope, rows, total_able_fields,
                        update_net_receive === false ? false : 'net_receive');
                }; 

                // 开始日期输入
                $scope.start_date_config = {
                    field: 'start_time',
                    widget: 'datetime',
                    'ng-model': 'bill_meta_data.start_time',
                    group_tpl: BILL_META_INPUT_GROUP_TPL
                };
				
				// 结束日期输入
				$scope.end_date_config = {
				    field: 'end_time',
				    widget: 'datetime',
				    'ng-model': 'bill_meta_data.end_time',
				    group_tpl: BILL_META_INPUT_GROUP_TPL
				};

            }
        ])
    ;

ones.global_module
    .service('MyApp.PlansAPI', [
        'ones.dataApiFactory',
        '$injector',
        function(dataAPI, $injector) {

            /* this.resource = dataAPI.getResourceInstance({
                uri: 'sale/orders'
            }); */
			this.resource = "mock";

            this.config = {
                app: 'myApp',
                module: 'plans',
                table: 'plans',
                is_bill: true,
                detail_able: true,
                //workflow: 'sale.orders',
                bill_row_model: 'MyApp.PlansDetailAPI',
                fields: {
                    bill_no: {
                        search_able: true,
                        grid_fixed: true
                    },
                    subject: {
                        search_able: true,
                        grid_fixed: true
                    },
                    quantity: {
                        get_display: function(value, item) {
                            return to_decimal_display(value);
                        }
                    },
					net_receive: {
					    get_display: function(value, item) {
					        return to_decimal_display(value);
					    },
					    label: '总重'
					},
                    user_info_id: {
						label: '创建人',
                        cell_filter: 'to_user_fullname'
                    },
                    end_time: {
                        widget: 'datetime'
                    },
					start_time: {
					    widget: 'datetime'
					}
                },
                bill_meta_required: [
                    'subject'
                ],
                filters: {
                },
                sortable: [
                    'start_time', 'quantity', 'end_time'
                ],
                list_hide: []
            };

            if(is_app_loaded('printer')) {
                this.config.extra_selected_actions = [];
                var printer = $injector.get('ones.printerModule');
                printer.generate_selected_print_action(this.config.extra_selected_actions, 'sale', 'orders');
            }
        }
    ])
    .service('MyApp.PlansDetailAPI', [
        'ones.dataApiFactory',
        'Product.ProductAPI',
        '$q',
        function(dataAPI, product, $q) {
            /* this.resource = dataAPI.getResourceInstance({
                uri: 'sale/ordersDetail'
            }); */
			this.resource = "mock";

            this.config = {
                app: 'myApp',
                module: 'plansDetail',
                table: 'plans_detail',
                fields: {
                    ship_id: {
                        label: "船名"
                        //, widget: 'select3'
                        //, data_source: 'Product.ProductAPI'
                        //, auto_query: false
                        , get_display: function() {
                            return false;
                        }
                        //, 'ng-blur': '$parent.$parent.$parent.fetch_unit_price(bill_rows, $parent.$parent, $parent.$index)'
                        //, 'ng-keydown': '$parent.$parent.$parent.fetch_unit_price(bill_rows, $parent.$parent, $parent.$index, $event)'
                    }
                    , remark: {
                        label: '装运泊位备注'
                        , blank: true
                        , editable_required: 'ship_id'
                        , force_editable: true
                    }
                    , quantity1: {
                        label: "矿1"
                        , widget: 'number'
                        , get_display: function(value, item) {
                            return to_decimal_display(value);
                        }
                        // 单元格后置计量单位
                        /* , get_bill_cell_after: function(value, item) {
                            return to_product_measure_unit(product, $q, item);
                        }, */
                        , 'ng-blur': '$parent.$parent.$parent.re_calculate_subtotal(bill_rows, $parent.$parent, $parent.$index)'
                        , editable_required: 'ship_id'
                        , total_able: true
                    },
					quantity2: {
					    label: "矿2"
					    , widget: 'number'
					    , get_display: function(value, item) {
					        return to_decimal_display(value);
					    }
					    // 单元格后置计量单位
					    /* , get_bill_cell_after: function(value, item) {
					        return to_product_measure_unit(product, $q, item);
					    }, */
					    , 'ng-blur': '$parent.$parent.$parent.re_calculate_subtotal(bill_rows, $parent.$parent, $parent.$index)'
					    , editable_required: 'ship_id'
					    , total_able: true
					},
					quantity3: {
					    label: "矿3"
					    , widget: 'number'
					    , get_display: function(value, item) {
					        return to_decimal_display(value);
					    }
					    // 单元格后置计量单位
					    /* , get_bill_cell_after: function(value, item) {
					        return to_product_measure_unit(product, $q, item);
					    }, */
					    , 'ng-blur': '$parent.$parent.$parent.re_calculate_subtotal(bill_rows, $parent.$parent, $parent.$index)'
					    ,editable_required: 'ship_id'
					    , total_able: true
					},
					subtotal_amount: {
					    editable: false
					    , label: _('common.Subtotal Amount')
					    , get_display: function(value, item) {
					        return to_decimal_display(value);
					    }
					    , total_able: true
					},
					customer: {
						label: "货主"
						, get_display: function() {
						    return false;
						}
					},
					phone: {
						label: "联系电话"
						, get_display: function() {
						    return false;
						}
					}
                },
                bill_fields: [
                    'ship_id'
                    , 'quantity1'
					, 'quantity2'
                    , 'quantity3'
					//, 'subtotal_amount'
                    , 'customer'
					, 'phone'
                    ,'remark'
                ],

                bill_row_required: [
                    'ship_id'
                ]
            };

            /* if(is_app_loaded('storage')) {
                this.config.bill_fields.splice(this.config.bill_fields.indexOf('quantity')+1, 0, 'stock_quantity');
            } */
        }
    ])
;

})(window, window.angular, window.ones, window.io);