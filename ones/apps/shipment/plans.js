(function(window, angular, ones, io){
    /*
     * @app Shipment
     * @author laofahai@TEam Swift
     * @link http://ng-erp.com
     * */
    'use strict';
    angular.module('ones.app.shipment.plans', ['ones.billModule'])
        .config(['$routeProvider', function($route) {
            $route
                .when('/shipment/plans/add/bill', {
                    controller : 'ShippingPlanPlansBillCtrl',
                    templateUrl: appView('plans_edit.html')
                })
                .when('/shipment/plans/edit/bill/:id', {
                    controller : 'ShippingPlanPlansBillCtrl',
                    templateUrl: appView('plans_edit.html')
                })
                .when('/shipment/plans/:action/bill/:id', {
                    controller : 'ShippingPlanPlansBillCtrl',
                    templateUrl: appView('plans_edit.html')
                })
                .when('/shipment/plans/:action/bill/:id/node/:node_id', {
                    controller : 'ShippingPlanPlansBillCtrl',
                    templateUrl: appView('plans_edit.html')
                })
            ;
        }])
        .controller('ShippingPlanPlansBillCtrl', [
            '$scope',
            '$timeout',
            'Shipment.PlansAPI',
            'Shipment.PlansDetailAPI',
            'Ship.ShipAPI',
            'Bpm.WorkflowAPI',
            'BillModule',
            '$routeParams',
            '$q',
            '$injector',
            'RootFrameService',
            '$parse',
            function($scope, $timeout, plan_api, plan_detail_api, ship_api,
                     workflow_api, bill, $routeParams, $q, $injector, RootFrameService, $parse) {
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
    .service('Shipment.PlansAPI', [
        'ones.dataApiFactory',
        '$injector',
        function(dataAPI, $injector) {

            this.resource = dataAPI.getResourceInstance({
                uri: 'shipment/shippingPlans'
            }); 
			//this.resource = "mock";

            this.config = {
                app: 'shipment',
                module: 'plans',
                table: 'plans',
                is_bill: true,
                detail_able: true,
                //workflow: 'sale.orders',
                bill_row_model: 'Shipment.PlansDetailAPI',
                fields: {
                    bill_no: {
                        search_able: true,
                        grid_fixed: true
                    },
                    subject: {
                        search_able: true,
                        grid_fixed: true
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
					by_user: {
					    label: _('common.User'),
					    type: 'link',
					    data_source: window.DEAL_USER_DATASOURCE
					}
                },
                sortable: [
                    'start_time', 'quantity', 'end_time'
                ],
                list_hide: ['remark']
            };

            if(is_app_loaded('printer')) {
                this.config.extra_selected_actions = [];
                var printer = $injector.get('ones.printerModule');
                printer.generate_selected_print_action(this.config.extra_selected_actions, 'sale', 'orders');
            }
        }
    ])
    .service('Shipment.PlansDetailAPI', [
        'ones.dataApiFactory',
        'Ship.ShipAPI',
        '$q',
        function(dataAPI, ship, $q) {
            this.resource = dataAPI.getResourceInstance({
                uri: 'shipment/shippingPlansDetail'
            });
			//this.resource = "mock";

            this.config = {
                app: 'shipment',
                module: 'plansDetail',
                table: 'plans_detail',
                fields: {
                    ship_id: {
                        label: "船名"
                        , widget: 'select3'
                        , data_source: 'Ship.ShipAPI'
                        , auto_query: false
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
                        //, force_editable: true
                    }
                    , quantity1: {
                        label: "矿1"
                        , widget: 'number'
                        , get_display: function(value, item) {
                            return to_decimal_display(value);
                        }
                        // 单元格后置计量单位
                        , get_bill_cell_after: function(value, item) {
                            return to_product_measure_unit(ship, $q, item);
                        }
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
					customer_id: {
						label: "货主"
						, editable_required: 'ship_id'
						//, force_editable: true
					},
					customer_phone: {
						label: "联系电话"
						, editable_required: 'ship_id'
						//, force_editable: true
					}
                },
                bill_fields: [
                    'ship_id'
                    , 'quantity1'
					, 'quantity2'
                    , 'quantity3'
					, 'subtotal_amount'
                    , 'customer_id'
					, 'customer_phone'
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