(function(window, angular, ones) {
    angular.module('ones.app.order.check', [])
        .service('Order.CheckAPI', [
            'ones.dataApiFactory',
            '$injector',
            function(dataAPI, $injector) {
				console.log('its check')
                var self = this;
				//只查工作流进程为未处理和已核对的
                /* this.resource = dataAPI.getResourceInstance({
                    uri: 'order/check'
                }); */
				
				this.resource = 'order_check_mock';

                this.config = {
                    app: 'order',
                    module: 'check',
                    table: 'order_check',
                    is_bill: true,
					addable: false,
                    detail_able: true,
                    workflow: 'order.check',
                    bill_row_model: 'Order.checkDetailAPI',
                    fields: {
                        bill_no: {
                            search_able: true,
                            grid_fixed: true
                        },
                        type: {
                            search_able: true,
                            grid_fixed: true
                        },
                        ship_id: {
							search_able: true,
                            label: _('船名'),
                        },
						customer_id: {
						    label: _('crm.Customer')
						},
						status: {
							addable: false,
							editable: false,
							label: '订单状态',
							get_display: function(value, item) {
							    return item.workflow_node_status_label;
							}
						},
						/* ship_status: {
							label: '船只状态'
						}, */
                        created: {
                            widget: 'datetime',
                        },
						estimated_time: {
						    label: '预计到港',
						},
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

        .service('Order.checkDetailAPI', [
            'ones.dataApiFactory',
            'Product.ProductAPI',
            '$q',
            function(dataAPI, product, $q) {

                this.resource = dataAPI.getResourceInstance({
                    uri: 'order/checkDetail'
                });

                this.config = {
                    app: 'order',
                    module: 'checkDetail',
                    table: 'order_check_detail',

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
                            label: _('common.Quantity')
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
                        ,'remark'
                    ],

                    bill_row_required: [
                        'product_id', 'quantity'
                    ]
                };

            }
        ])

        .controller('CheckBillEditCtrl', [
            '$scope',
            '$timeout',
            'Order.CheckAPI',
            'Order.checkDetailAPI',
            'Product.ProductAPI',
            'Bpm.WorkflowAPI',
            'BillModule',
            '$routeParams',
            '$q',
            '$injector',
            'RootFrameService',
			'ones.dataApiFactory',
            function($scope, $timeout, check_api, check_detail_api, product_api, workflow_api, bill, $routeParams, $q, $injector, RootFrameService, dataAPI) {

                if(!$routeParams.id) {
                   $scope.bill_meta_data = {
                        //created: new Date(moment().format()),
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
                    model: check_api,
                    /* subject: _('storage.Stock In Bill'),
                    bill_no: {
                        value: generate_bill_no('RK')
                    } */
                };
				
				//后期改成查询,用timeout
				$scope.bill_meta_data.shipment_Wannan = 10000;
				$scope.bill_meta_data.shipment_Wanbei = 10000;
				$scope.bill_meta_data.balance = 9999999;
				$timeout(function(){
					$scope.bill_meta_data.ship = dataAPI.getResourceInstance({
					    uri: 'ship/ship'
					}).get({
						id: $scope.bill_meta_data.ship_id
					}).$promise.then(function(data){
							//console.log(data);
							$scope.bill_meta_data.ship = data;
						});
				},400);
				
				$scope.showDetail = function(){
					//console.log($scope.bill_meta_data.ship);
				}
				
				/* $scope.bill_meta_data.ship = dataAPI.getResourceInstance({
                    uri: 'ship/ship'
                }).get({
                        id: this.config.id
                    }).$promise.then(function(data){
							console.log(data);
                            self.scope.edit_data_source = data;
                            self.scope.$broadcast('form.dataLoaded', data);
                        });; */
				
                switch($routeParams.action) {
                    case "view":
                        $scope.is_view = true;
                        $scope.bill_meta_data.locked = true;
                        /* if(stock_in_detail_api.config.bill_fields.indexOf('already_in') < 0) {
                            stock_in_detail_api.config.fields.quantity.label = _('storage.Total Quantity');
                            stock_in_detail_api.config.bill_fields.splice(
                                stock_in_detail_api.config.bill_fields.indexOf('quantity')+1,
                                0,
                                'already_in'
                            );
                        }
                        stock_in_detail_api.config.bill_fields.splice(stock_in_detail_api.config.bill_fields.indexOf('this_time_in_quantity'), 1); */
                        break;
                    case "confirm":
                        $scope.back_able             = true;
                        $scope.is_view               = true;
                        $scope.bill_meta_data.locked = true;
                        $scope.workflowing           = true;
                        $scope.is_confirm            = true;
						
                        /* if(stock_in_detail_api.config.bill_fields.indexOf('this_time_in_quantity') < 0) {
                            // 新增本次入库/已入库数量控件，及修改仓库控件可编辑
                            stock_in_detail_api.config.fields.this_time_in_quantity = {
                                label: _('storage.This time in quantity'),
                                widget: 'number',
                                force_editable: true,
                                value: 0,
                                get_display: function(value) {
                                    return to_decimal_display(value);
                                },
                                get_bill_cell_after: function(value, item) {
                                    return to_product_measure_unit(product_api, $q, item);
                                }
                            };

                            stock_in_detail_api.config.fields.storage_id.force_editable = true;
                            stock_in_detail_api.config.fields.quantity.label = _('storage.Total Quantity');
                            stock_in_detail_api.config.fields.quantity.width = 180;
                            stock_in_detail_api.config.bill_fields.splice(
                                stock_in_detail_api.config.bill_fields.indexOf('quantity')+1,
                                0,
                                'this_time_in_quantity'
                            );
                        } */

                        /* if(stock_in_detail_api.config.bill_fields.indexOf('already_in') < 0) {
                            stock_in_detail_api.config.fields.quantity.label = _('storage.Total Quantity');
                            stock_in_detail_api.config.bill_fields.splice(
                                stock_in_detail_api.config.bill_fields.indexOf('quantity')+1,
                                0,
                                'already_in'
                            );
                        } */


                        // 确认入库提交方法
                        $scope.do_confirm = function() {
                            /* var post_data = bill.format_bill_data();
                            var rows = [];
                            angular.forEach(post_data.rows, function(item) {
                                if(!item.id || !item.storage_id || !item.this_time_in_quantity || !item.product_unique_id) {
                                    return;
                                }
                                rows.push(item);
                            });

                            if(!rows) {
                                RootFrameService.alert({
                                    type: 'danger',
                                    content: _('storage.Please fill this time in quantity')
                                });
                            }

                            workflow_api.post($routeParams.node_id, post_data.meta.id, {rows: rows});*/
                        }; 

                        break;
                }

                // 日期
                $scope.date_config = {
					label: '预计到港',
                    field: 'estimated_time',
                    widget: 'datetime',
                    'ng-model': 'bill_meta_data.estimated_time',
                    group_tpl: '<div class="input-group"><span class="input-group-addon">%(label)s</span>%(input)s</div>'
                };
				//
				$scope.delivery_time_config = {
					label: '发货时间',
				    field: 'delivery_time',
				    widget: 'datetime',
				    'ng-model': 'bill_meta_data.delivery_time',
				    group_tpl: '<div class="input-group"><span class="input-group-addon">%(label)s</span>%(input)s</div>'
				};
				/* //船状态
				$scope.ship_status_config = {
					label: '船只状态',
				    field: 'ship_status',
				    //widget: 'datetime',
				    'ng-model': 'bill_meta_data.ship_status',
				    group_tpl: '<div class="input-group"><span class="input-group-addon">%(label)s</span>%(input)s</div>'
				}; */
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