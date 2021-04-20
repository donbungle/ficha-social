'use strict';

/**
 * @ngdoc function
 * @name app.route:fichaRoute
 * @description
 * # fichaRoute
 * Route of the app
 */

angular.module('ficha')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.ficha', {
				url:'/ficha',
				templateUrl: 'app/modules/ficha/ficha.html?1',
				controller: 'FichaCtrl',
				controllerAs: 'vm'
			});
		
	}]);
