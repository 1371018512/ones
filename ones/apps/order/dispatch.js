(function(window, angular, ones) {
    angular.module('ones.app.order.dispatch', [])
        .service('Order.DispatchAPI', [
            'ones.dataApiFactory',
            '$injector',
            function(dataAPI, $injector) {
				console.log('its dispatch')
                var self = this;
				
                /* this.resource = dataAPI.getResourceInstance({
                    uri: 'order/dispatch'
                }); */
				
				this.resource = 'order_dispatch_mock';

                this.config = {
                    app: 'order',
                    module: 'dispatch',
                    table: 'order_dispatch',
                    is_bill: true,
					addable: false,
                    detail_able: true,
                    workflow: 'order.dispatch',
                    bill_row_model: 'Order.DispatchDetailAPI',
                    fields: {
                        bill_no: {
                            search_able: true,
                            grid_fixed: true
                        },
						order_id: {
						    search_able: true,
							label: '来源订单',
						    grid_fixed: true
						},
                        /* type: {
                            search_able: true,
                            grid_fixed: true
                        }, */
						delivery_place: {
							search_able: true,
                            label: '发货地点',
                        },
						dispatch_time: {
						    label: '发货时间',
							widget: 'datetime',
						},
                        ship_id: {
							search_able: true,
                            label: '船名',
                        },
						customer_id: {
						    label: _('crm.Customer')
						},
						status: {
							addable: false,
							editable: false,
							label: '发货单状态',
							get_display: function(value, item) {
							    return item.workflow_node_status_label;
							}
						},
						/* ship_status: {
							label: '船只状态'
						}, */
                        total_weight: {
							label: '总重',
                            get_display: function(value, item) {
                                return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
                            }
                        },
						
                    },
                    bill_meta_required: [
                        'created'
                    ],
                    /* filters: {
                        workflow_id: {
                            type: 'link'
                        },
                        by_user: {
                            label: _('common.User'),
                            type: 'link',
                            data_source: window.DEAL_USER_DATASOURCE
                        }
                    }, */
                    sortable: [
                        'created', 'status'
                    ],
                    list_hide: ['remark']
                };

                /* try {
                    if(is_app_loaded('printer')) {
                        this.config.extra_selected_actions = [];
                        var printer = $injector.get('ones.printerModule');
                        printer.generate_selected_print_action(this.config.extra_selected_actions, 'storage', 'stockIn');
                    }
                } catch(e) { } */

            }
        ])

        .service('Order.DispatchDetailAPI', [
            'ones.dataApiFactory',
            'Product.ProductAPI',
            '$q',
            function(dataAPI, product, $q) {

                this.resource = dataAPI.getResourceInstance({
                    uri: 'order/dispatchDetail'
                });

                this.config = {
                    app: 'order',
                    module: 'dispatchDetail',
                    table: 'order_dispatch_detail',

                    fields: {
                        product_id: {
                            label: _('product.Product')
                            , widget: 'select3'
                            , data_source: 'Product.ProductAPI'
                            , auto_query: false
                            , get_display: function() {
                                return false;
                            }
                        }
                        , quantity: {
                            label: '总数量'
                            , widget: 'number'
                            , get_display: function(value, item) {
                                return to_decimal_display(value);
                            }
                            // 单元格后置计量单位
                            , get_bill_cell_after: function(value, item) {
                                return to_product_measure_unit(product, $q, item);
                            },
                            editable_required: 'product_id'
                        }
						/* , real_quantity: {
						    label: '实际数量',
						    widget: 'number'
						    , get_display: function(value, item) {
						        return to_decimal_display(value);
						    },
							// 单元格后置计量单位
							get_bill_cell_after: function(value, item) {
							    return to_product_measure_unit(product, $q, item);
							},
							'ng-blur': '$parent.$parent.$parent.re_calculate_total(bill_rows, $parent.$parent, $parent.$index)'
						} */
                        , remark: {
                            label: _('common.Remark')
                            , blank: true
                            , editable_required: 'product_id'
                            , force_editable: true
                        }
                    },

                    bill_fields: [
                        'product_id'
                        ,'quantity'
						//,'real_quantity'
						,'remark'
                    ],

                    bill_row_required: [
                        'product_id', 'quantity'
                    ]
                };

            }
        ])

        .controller('DispatchBillEditCtrl', [
            '$scope',
            '$timeout',
            'Order.DispatchAPI',
            'Order.DispatchDetailAPI',
            'Product.ProductAPI',
            'Bpm.WorkflowAPI',
            'BillModule',
            '$routeParams',
            '$q',
            '$injector',
            'RootFrameService',
			'ones.dataApiFactory',
            function($scope, $timeout, dispatch_api, dispatch_detail_api, product_api, workflow_api, bill, $routeParams, $q, $injector, RootFrameService, dataAPI) {

                if($routeParams.action == 'dispatch') {
                   $scope.bill_meta_data = {
                        //delivery_time: new Date(moment().format())
                        //user_info_id: ones.user_info.id
                    };
                } else {
                    $scope.bill_meta_data = {};
                }

                if($routeParams.id) {
                    $scope.is_edit = true;
                }

                // 产品属性
                /* if(is_app_loaded('productAttribute')) {
                    $injector.get('ProductAttribute.ProductAttributeAPI').assign_attributes(stock_in_detail_api);
                } */

                // bill基本配置
                $scope.bill_config = {
                    model: dispatch_api,
                    /* subject: _('storage.Stock In Bill'),
                    bill_no: {
                        value: generate_bill_no('RK')
                    } */
                };
				
				
				
				var total_able_fields = ['real_quantity'];
				angular.forEach(dispatch_detail_api.config.fields, function(config, field) {
				    if(config.total_able) {
				        total_able_fields.push(field);
				    }
				});
				
				// 计算小计
				/* $scope.re_calculate_subtotal = function(rows, row_scope, row_index) {
				    bill.common_methods.re_calculate_subtotal($scope, rows, row_scope, row_index);
				    $scope.re_calculate_total(rows);
				}; */
				
				// 计算合计
				$scope.re_calculate_total = function(rows, update_net_receive) {
					console.log('xxxx')
				    bill.common_methods.re_calculate_total($scope, rows, total_able_fields,
				        update_net_receive === false ? false : 'real_weight');
				};
				
			
				
                switch($routeParams.action) {
                    case "view":
                        $scope.bill_meta_data.is_view = true;
                        $scope.bill_meta_data.locked = true;
						
						if(dispatch_detail_api.config.bill_fields.indexOf('real_quantity')>=0)
							dispatch_detail_api.config.bill_fields.splice(
								dispatch_detail_api.config.bill_fields.indexOf('real_quantity'),
								1
							);
						
                        break;
                    case "confirm":
						$scope.bill_meta_data.confirm_editable = true;
                        $scope.back_able             = true;
                        $scope.is_view               = true;
                        $scope.bill_meta_data.locked = true;
                        $scope.workflowing           = true;
                        $scope.is_confirm            = true;
						
						if(dispatch_detail_api.config.bill_fields.indexOf('real_quantity')<0){
							dispatch_detail_api.config.fields.real_quantity = {
								label: '实际数量',
								widget: 'number',
								force_editable: true
								, get_display: function(value, item) {
									return to_decimal_display(value);
								},
								total_able: true,
								// 单元格后置计量单位
								get_bill_cell_after: function(value, item) {
									return to_product_measure_unit(product_api, $q, item);
								},
								'ng-blur': '$parent.$parent.$parent.re_calculate_total(bill_rows, $parent.$parent, $parent.$index)'
							}
													
							dispatch_detail_api.config.bill_fields.splice(
							    dispatch_detail_api.config.bill_fields.indexOf('quantity')+1,
							    0,
							    'real_quantity'
							);
						}
							
                        // 核对提交方法
                        $scope.do_confirm = function() {
							
                        }; 

                        break;
                }

				// 发货时间
				$scope.dispatch_time_config = {
					label: '发货时间',
				    field: 'dispatch_time',
				    widget: 'datetime',
				    'ng-model': 'bill_meta_data.dispatch_time',
				    group_tpl: '<div class="input-group"><span class="input-group-addon">%(label)s</span>%(input)s</div>'
				};
				
				// 船只查看
				$scope.ship_config = {
				    label: '船只',
				    field: 'ship_id',
				    'ng-model': 'bill_meta_data.ship_id__label__',
				    group_tpl: '<div class="input-group"><span class="input-group-addon">%(label)s</span><div class="select3-container-box">%(input)s</div></div>',
				};
				
				//客户id
				$scope.customer_config = {
				    label: _('crm.Customer'),
				    field: 'customer_id',
				    widget: 'select3',
				    'ng-model': 'bill_meta_data.customer_id',
				    data_source: 'Crm.CustomerAPI',
				    value_field: 'customer_id',
				    id: 'sale_orders_customer_id_input',
				    group_tpl: '<div class="input-group"><span class="input-group-addon">%(label)s</span><div class="select3-container-box">%(input)s</div></div>',
				    scope: $scope,
				    data_source_value_field: 'customer_id'
				};



            }
        ])
    ;
})(window, window.angular, window.ones);