(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

  	angular
		.module('educere-app')
		.factory('MenuService', Menu);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Menu.$inject = ['$http'];

		function Menu ($http) {

			var menu = [
				
					{
						link: 'ficha',
						name: 'Ficha Programa',
						icon: 'assignment_ind'
					},
			    
		  	];

			return {
				listMenu: function () {
					return menu;
				}
		  	};

		}

})();
