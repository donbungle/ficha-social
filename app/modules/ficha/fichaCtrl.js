(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:fichaCtrl
	* @description
	* # fichaCtrl
	* Controller of the app
	*/

  	angular
		.module('ficha')
		.controller('FichaCtrl', Ficha);

		Ficha.$inject = ['$scope', 'FichaService', '$mdToast', '$log'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Ficha($scope, FichaService, $mdToast, $log) {
			/*jshint validthis: true */
			var vm = this;

			vm.tabs = FichaService.getTabs();
		
			vm.form = [
				"*"
			];
		
			vm.formulario_model = {};

			vm.onSubmit = function(form) {
				$scope.$broadcast('schemaFormValidate');
				console.log(form);
				if (form.$valid) {
					$mdToast.show(
					$mdToast.simple()
						.textContent('VALID!')
					)
					.then(function() {
						$log.log('Toast dismissed.');
					}).catch(function() {
						$log.log('Toast failed or was forced to close early by another toast.');
					});
				}else{
					$mdToast.simple("NOT VALID");
				}
			}

		}

})();
