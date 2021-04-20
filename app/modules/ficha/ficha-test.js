(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:fichaTest
	 * @description
	 * # fichaTest
	 * Test of the app
	 */

	describe('ficha test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('FichaCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
