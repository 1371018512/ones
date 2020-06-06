(function(window, angular, ones, io) {
	/*
	 * @app myApp
	 * @author laofahai@TEam Swift
	 * @link http://ng-erp.com
	 * */
	'use strict';
	ones.global_module
		.service('MyApp.SchedulePlanAPI', [
			'ones.dataApiFactory',
			'$injector',
			'$routeParams',
			function(dataAPI, $injector, $routeParams) {
				var self = this;

				this.resource = dataAPI.getResourceInstance({
					uri: 'sale/orders'
				});

				this.config = {
					app: 'sale',
					module: 'orders',
					table: 'orders',
					is_bill: true,
					detail_able: true,
					workflow: 'sale.orders',
					bill_row_model: 'Sale.OrdersDetailAPI',
					fields: {
						bill_no: {
							search_able: true,
							grid_fixed: true
						},
						subject: {
							search_able: true,
							grid_fixed: true
						},
						status: {
							addable: false,
							editable: false,
							get_display: function(value, item) {
								return item.workflow_node_status_label;
							}
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
							label: _('common.Net Total Receive Amount')
						},
						user_info_id: {
							cell_filter: 'to_user_fullname'
						},
						created: {
							widget: 'datetime'
						},
						workflow_id: {
							data_source: 'Bpm.WorkflowAPI',
							data_source_query_param: {
								_mf: 'module',
								_mv: 'sale.orders',
								_fd: 'id,name'
							}
						},
						customer_id: {
							label: _('crm.Customer')
						}
					},
					bill_meta_required: [
						'subject', 'created', 'customer_id'
					],
					filters: {
						workflow_id: {
							type: 'link'
						},
						by_user: {
							label: _('common.User'),
							type: 'link',
							data_source: window.DEAL_USER_DATASOURCE
						}
					},
					sortable: [
						'created', 'net_receive', 'quantity', 'status'
					],
					list_hide: ['source_id', 'remark', 'currency']
				};

				if (is_app_loaded('printer')) {
					this.config.extra_selected_actions = [];
					var printer = $injector.get('ones.printerModule');
					printer.generate_selected_print_action(this.config.extra_selected_actions, 'sale', 'orders');
				}
			}
		]);
})(window, window.angular, window.ones, window.io);
