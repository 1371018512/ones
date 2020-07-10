(function(window, angular, ones, io) {
    'use strict';

    angular.module('ones.app.transMeter.model', [])
        .service("TransMeter.MeterAPI", [
            'ones.dataApiFactory',
            'RootFrameService',
            function(dataAPI, RootFrameService) {
                var self = this;

                this.unicode = function(item) {
                    return item.name;
                    //return item.serial_number + ' ' + item.name;
                };

                this.config = {
                    app: 'transMeter',
                    module: 'meter',
                    table: 'meter',
					addable: false,
                    fields: {
						order_id: {
							label: '所属发货单号',
							search_able: true,
							grid_fixed: true
						},
						ship_id: {
							label: '船号',
							search_able: true,
							grid_fixed: true
						},
						type: {
						    search_able: true,
						    grid_fixed: true
						},
						created: {
						    widget: 'datetime',
						},
						total_weight: {
							label: '预计总重',
						    get_display: function(value, item) {
						        return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
						    }
						},
						already_weight: {
							label: '已计量数',
						    get_display: function(value, item) {
						        return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
						    }
						},
						remark: {
						    label: _('common.Remark')
						}
                    },
                    sortable: ['id'],
                    /* filters: {
                        product_category_id: {
                            type: 'link'
                        }
                    }, */
                    extra_selected_actions: []
                };


				/*
				* 右键计量操作
				* */
			
				var add_label = '计量操作';
				this.config.extra_selected_actions.push({
					label: add_label,
					//auth_node: 'productAttribute.productAttributeContent.post',
					icon: 'plus',
					action: function(evt, selected, item) {
						item = item || selected[0];
						if(!item) {
							return false;
						}
			
						RootFrameService.open_frame({
							label: add_label,
							//src: 'productAttribute/productAttributeContent/add/product_id/'+item.id,
							src: 'transMeter/meter/meter/meter_id/'+item.id,
							singleton: true
						});
					}
				});
				
				
               /* this.resource = dataAPI.getResourceInstance({
                    uri: 'transMeter/meter',
                    extra_methods: ['api_query', 'update', 'api_get']
                }); */
				this.resource = 'transMeter_meter_mock'

            }
        ])
		.service("TransMeter.MeterLogAPI", [
		    'ones.dataApiFactory',
		    'RootFrameService',
		    function(dataAPI, RootFrameService) {
		        var self = this;
		
		        this.config = {
		            app: 'transMeter',
		            module: 'meterLog',
		            table: 'meter_log',
					addable: false,
		            fields: {
						order_id: {
							label: '所属计量表号',
							search_able: true,
							grid_fixed: true
						},
						car_id: {
							label: '车辆编号',
							search_able: true,
							grid_fixed: true
						},
						created: {
						    widget: 'datetime',
						},
						/* car_weight: {
							label: '车皮重',
						    get_display: function(value, item) {
						        return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
						    }
						}, */
						weight: {
							label: '本次重量',
						    get_display: function(value, item) {
						        return value ? accounting.formatNumber(Number(value), ones.system_preference.decimal_scale) : value;
						    }
						},
						remark: {
						    label: _('common.Remark')
						}
		            },
		            sortable: ['id'],
		            /* filters: {
		                product_category_id: {
		                    type: 'link'
		                }
		            }, */
		        };
		
		
				
		       /* this.resource = dataAPI.getResourceInstance({
		            uri: 'transMeter/meterLog',
		            extra_methods: ['api_query', 'update', 'api_get']
		        }); */
				this.resource = 'transMeter_meterLog_mock'
		
		    }
		])
    ;

})(window, window.angular, window.ones, window.io);