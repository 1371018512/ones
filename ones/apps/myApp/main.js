(function(window, angular, ones, io){
    /*
     * @app myApp
     * @author laofahai@TEam Swift
     * @link http://ng-erp.com
     * */
    'use strict';
    angular.module('ones.app.myApp.main', [
		'ones.frameInnerModule',
		'ones.gridViewModule',
		'ones.detailViewModule'
	]);
	console.log("myApp!")
		
    ;

})(window, window.angular, window.ones, window.io);