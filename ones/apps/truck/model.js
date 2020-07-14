(function(window, angular, ones, io) {
    'use strict';

    angular.module('ones.app.truck.model', [])
        .service("Truck.TruckAPI", [
            'ones.dataApiFactory',
            'RootFrameService',
            function(dataAPI, RootFrameService) {

                var self = this;

                this.unicode = function(item) {
                    return item.name;
                };

                this.config = {
                    app: 'truck',
                    module: 'truck',
                    table: 'truck',
                    fields: {
                        name: {
                            search_able: true,
                            grid_fixed: true
                            //search_able_fields: 'name,pinyin'
                        },
						tare: {
						    label: '皮重',
						    get_display: function(value) {
						        return accounting.format(value, ones.system_preference.decimal_scale);
						    }
						},
						carrying_capacity: {
							label: '核重',
							get_display: function(value) {
							    return accounting.format(value, ones.system_preference.decimal_scale);
							}
						},
                    },
                    sortable: ['id'],
                    filters: {
                    },
                    extra_selected_actions: []
                };



                /* this.resource = dataAPI.getResourceInstance({
                    uri: 'truck/truck',
                    extra_methods: ['api_query', 'update', 'api_get']
                }); */
				
				this.resource = 'truck_truck_mock';
				
            }
        ])
    ;

})(window, window.angular, window.ones, window.io);