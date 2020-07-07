(function(window, angular, ones, io){
    /*
     * @app order
     * @author laofahai@TEam Swift
     * @link http://ng-erp.com
     * */
    'use strict';
	//console.log('its order')
    angular.module('ones.app.order.main', [
		'ones.app.order.model',
		'ones.billModule',
		'ones.app.order.all',
		'ones.app.order.check',
		//'ones.app.order.dispatch'
	])
	.config(['$routeProvider', function($route) {

		$route
			// all
			.when('/order/all/:action/bill/:id', {
				controller : 'AllBillEditCtrl',
				templateUrl: appView('all_edit.html')
			})
			.when('/order/all/:action/bill/:id/node/:node_id', {
				controller : 'AllBillEditCtrl',
				templateUrl: appView('all_edit.html')
			})
			// check
			.when('/order/check/:action/bill/:id', {
				controller : 'CheckBillEditCtrl',
				templateUrl: appView('check_edit.html')
			})
			.when('/order/check/:action/bill/:id/node/:node_id', {
				controller : 'CheckBillEditCtrl',
				templateUrl: appView('check_edit.html')
			})
			// dispatch
			.when('/order/dispatch/:action/bill/:id', {
				controller : 'DispatchBillEditCtrl',
				templateUrl: appView('dispatch_edit.html')
			})
			.when('/order/dispatch/:action/bill/:id/node/:node_id', {
				controller : 'DispatchBillEditCtrl',
				templateUrl: appView('dispatch_edit.html')
			})
	}]);
})(window, window.angular, window.ones, window.io);