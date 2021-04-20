/*!
* educere-app - v0.0.1 - MIT LICENSE 2021-04-20. 
* @author Victor Catalan Perez
*/
(function() {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main modules of the application.
	 */

	angular.module('educere-app', [
		'ngResource',
		'ngAria',
		'ngMaterial',
		'ngMdIcons',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ui.router',
		'schemaForm',
		'home',
		'ficha',
	]);

})();

(function () {
    'use strict';
    
    angular
		.module('educere-app')
        .filter('fecha_temp', function () { 
            return function (input) {
                return moment.unix(input).format('DD-MM-YYYY');
            } ;
        }) ;

})();




(function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('educere-app')
		.config(configure)
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		
		
		$urlRouterProvider
			.otherwise('/dashboard');
			
	
			$mdThemingProvider.theme('tema')
			.primaryPalette('light-green')
			.accentPalette('orange')
			.warnPalette('green')
			.backgroundPalette('grey')
			.dark();
	
			$mdThemingProvider.setDefaultTheme('tema');	
			$mdThemingProvider.alwaysWatchTheme(true);
		
	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';
		$rootScope.url_indicadores = 'https://www.indecon.online/';
		$rootScope.app_name = "Educere App";
	}


})();

(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:fichaModule
	 * @description
	 * # fichaModule
	 * Module of the app
	 */

  	angular.module('ficha', []);

})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.module:homeModule
	* @description
	* # homeModule
	* Module of the app
	*/

	angular.module('home', []);
})();

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

'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('educere-app')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			
			.state('home', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/home/home.html?1111',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('home.dashboard', {
				url:'/dashboard',
				templateUrl: 'app/modules/home/dashboard.html?222'
			});
			
	}]);

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

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('educere-app')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService', '$rootScope'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService, $rootScope) {
		/*jshint validthis: true */
		var vm = this;
		vm.app_name = $rootScope.app_name;
		vm.title = "" + vm.app_name + "!";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();

	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:LayoutCtrl
	* @description
	* # LayoutCtrl
	* Controller of the app
	*/

	angular
		.module('educere-app')
		.controller('LayoutCtrl', Layout);

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog ) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.changePassword = function () {
			$mdToast.show(
				$mdToast.simple()
				.content('Password clicked!')
				.position('top right')
				.hideDelay(2000)
			);
		};

		vm.changeProfile = function (ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'tabDialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				$mdToast.show(
					$mdToast.simple()
					.content('You said the information was "' + answer + '".')
					.position('top right')
					.hideDelay(2000)
				);

			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('You cancelled the dialog.')
					.position('top right')
					.hideDelay(2000)
				);
			});

			function DialogController($scope, $mdDialog) {
				$scope.hide = function() {
					$mdDialog.hide();
				};

				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};
			}
		};


		vm.logOut = function () {

			alert('Implement your Function Here');
			// $cookies.put('dev_appserver_login', ' ');
			//$state.go('out', {}, {reload: true});

		};

		var originatorEv;
		vm.openMenu = function ($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:SidenavCtrl
	* @description
	* # SidenavCtrl
	* Controller of the app
	*/
	angular
		.module('educere-app')
		.controller('SidenavCtrl', SidenavCtrl)
		.controller('SettingsCtrl', SettingsCtrl);

	// Injecting Denpendencies

	SidenavCtrl.$inject = ['$rootScope', '$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', 'MenuService', '$scope'];
	SettingsCtrl.$inject = ['$mdBottomSheet'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function SidenavCtrl($rootScope, $mdSidenav, $state, $mdBottomSheet, $mdToast, MenuService, $scope) {
		/*jshint validthis: true */
		var vm = this;
		vm.app_name = $rootScope.app_name;
		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.closeSidenav = function() {
			$mdSidenav('left').close();
		};

		// Close menu on small screen after click on menu item.
		// Only use $scope in controllerAs when necessary; for example, publishing and subscribing events using $emit, $broadcast, $on or $watch.
		$scope.$on('$stateChangeSuccess', vm.closeSidenav);
		
		vm.menu = MenuService.listMenu();

		vm.admin = [
			{
				link: 'showListBottomSheet($event)',
				title: 'Settings',
				icon: 'settings'
			}
		];

		vm.navigateTo = function (target) {

			var page = target;

			$state.go(page);

		};

		vm.showSettingsBottom = function ($event) {
			vm.alert = '';
			$mdBottomSheet.show({
				template: '<md-bottom-sheet class="md-grid" layout="column" ng-cloak><div layout="row" layout-align="center center"><h4>With clickOutsideToClose option, drag down or press ESC to close</h4></div><md-list flex layout="row" layout-align="center center"><md-list-item ng-repeat="item in vm.items"><md-button class="md-grid-item-content" ng-click="vm.listItemClick($index)"><md-icon class="md-48">{{item.icon}}</md-icon><div class="md-grid-text"> {{ item.name }} </div></md-button></md-list-item></md-list></md-bottom-sheet>',
				controller: 'SettingsCtrl',
				controllerAs: 'vm',
				targetEvent: $event
			}).then(function (clickedItem) {
				$mdToast.show(
					$mdToast.simple()
					.content(clickedItem.name + ' clicked!')
					.position('top right')
					.hideDelay(2000)
				);
			});
		};

	}

	function SettingsCtrl($mdBottomSheet) {
		/*jshint validthis: true */
		var vm = this;

		vm.items = [
			{name: 'Roles', icon: 'assignment_ind'},
			{name: 'Notes', icon: 'speaker_notes'},
			{name: 'Tasks', icon: 'view_list'},
			{name: 'Inbox', icon: 'inbox'}
		];

		vm.listItemClick = function ($index) {
			var clickedItem = vm.items[$index];
			$mdBottomSheet.hide(clickedItem);
		};
	}

})();

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

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:homeService
	* @description
	* # homeService
	* Service of the app
	*/

	angular.module('educere-app')
		.factory('homeService', homeService);

	homeService.$inject = ['$http'];

	function homeService($http) {

		var list = [
			{"feature": "Implemented Best Practices, following: John Papa's Guide"},
			{"feature": "Using Controller AS syntax"},
			{"feature": "Wrap Angular components in an Immediately Invoked Function Expression (IIFE)"},
			{"feature": "Declare modules without a variable using the setter syntax"},
			{"feature": "Using named functions"},
			{"feature": "Including Unit test with Karma"},
			{"feature": "Including UI options for Bootstrap or Angular-Material"},
			{"feature": "Including Angular-Material-Icons for Angular-Material UI"},
			{"feature": "Dynamic Menu generator for both themes"},
			{"feature": "Grunt task for Production and Development"}
		];

		return {
			getFeaturesList: getFeaturesList
		};

		function getFeaturesList() {
			return list;
		}

	}

})();

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
						link: 'fichaprograma',
						name: 'Fichaprograma'
					},
			    
		  	];

			return {
				listMenu: function () {
					return menu;
				}
		  	}

		}

})();

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
