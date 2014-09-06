angular.module('app', ['ngRoute'],
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/contact', {
				templateUrl: 'views/contact.html',
				controller: ContactController,
		});

		$locationProvider.html5Mode(true);
	}
);