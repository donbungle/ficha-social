(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:fichaService
	 * @description
	 * # fichaService
	 * Service of the app
	 */

  	angular
		.module('ficha')
		.factory('FichaService', Ficha);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Ficha.$inject = ['$http'];

		function Ficha ($http) {
			var tabs = [
				{
					title: "Identificación del postulante",
					schema: {
						type: "object",
						properties: {
							name: { 
								type: "string", 
								minLength: 2, 
								title: "Name", 
								description: "Name or alias" 
							}
						}
					}
				},
				{
					title: "Institución que deriva",
					schema: {
						type: "object",
						properties: {
							title: { 
								type: "string", 
								title: "Title", 
								description: "Name or alias" 
							}
						}
					}
				},
				{
					title: "Evaluación del Proceso Terapéutico",
					schema: {
						type: "object",
						properties: {
							phone: { 
								type: "string", 
								title: "Phone", 
								description: "Name or alias" 
							}
						}
					}
				},
				{
					title: "Observaciones Finales",
					schema: {
						type: "object",
						properties: {
							phone: { 
								type: "string", 
								title: "Phone", 
								description: "Name or alias" 
							}
						}
					}
				}
			];

			var service = {
				getTabs: getTabs,
			};
			return service;

			

			function getTabs(){
				/*return $http({
					url: url + '/last',   
					method: "GET",
					params: {}
				});*/
				return tabs;
			}

			
			
		}

})();
