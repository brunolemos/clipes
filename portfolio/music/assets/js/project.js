var DEBUG = 1;
var LOGNS = 'APP ::';
var APP_ID = '136053';
var CHANNEL_URL = 'http://brunolemos.org/deezer-channel.php';

if(!DEBUG) console.log = function() {};

angular.module('Clipes', ['ui.router'])
 
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('home', {
			url: '/',
		// 	// controller: 'HomeCtrl',
		// 	// templateUrl: 'views/home.html'
		})

		.state('search', {
			url: '/search/:search',
			templateUrl: 'views/search.html',
			controller: 'SearchCtrl',
			reloadOnSearch: false,
		})

		.state('artist', {
			url: '/artist/:id',
			controller: 'ArtistCtrl',
			templateUrl: 'views/artist.html',
		})

		.state('artist.top', {
			url: '/top',
		})

		.state('artist.album', {
			url: '/:albumID',
			reload: true,
		})

		.state('error', {
			templateUrl: 'views/error.html',
		})
	;

	$urlRouterProvider
		.when('/search', function($state) {
			$state.go('search');
		})

		.otherwise(function($state) {
			$state.go('error');
		})
	;

  	$locationProvider.html5Mode(true).hashPrefix('!');
})

.directive('forceSquare', function($window) {
	return {
		restrict: 'A',
		link: function($scope, iElm, iAttrs, controller) {
			var w = angular.element($window);

			function updateHeight() {
				iElm[0].height = iElm[0].clientWidth;
			}

			iElm.on('load', updateHeight);
			w.bind('resize', updateHeight);
		}
	};
})

.directive('smoothLoad', function($window) {
	return {
		scope: {
			style: '@style'
		},
		restrict: 'AC',
		link: function($scope, iElm, iAttrs, controller) {
			var elem = iElm;
			
			if(iElm[0].nodeName != 'IMG') {
				var r = new RegExp(/url\(["']?([^["'\)]+)/i);
				var src = ($scope.style ? r.exec($scope.style)[1] : '');
				
				if(src) {
					elem = angular.element('<img/>');
					elem.src = src;
				} else {
					elem = angular.element($window);
				}
			}

			iElm[0].classList.add('smooth-load', 'loading');
			elem.on('load', function() {
				iElm[0].classList.remove('loading');
				iElm[0].classList.add('loaded');
			});
		}
	};
})

.filter('humain_time', function() {
	return function(time) {
		if (time && time > 0.0) {
			var sec = parseInt(time % 60);
			return parseInt(time / 60) + ':' + (sec < 10 ? '0' + sec : sec);
		} else {
			return '0:00';
		}
	};
})

.factory('PlayerService', function() {
	return DZ.player;
})

.run(function($rootScope, $state, $location, PlayerService) {
	DZ.init({
		appId: APP_ID,
		channelUrl: CHANNEL_URL,
		player: {

		}
	});

	// $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	// 	if(fromState.name != toState.name) $rootScope.search = '';
	// });

	$rootScope.onSearchKeyUp = function($event) {
		if($event.keyCode != 27) {
			$location.path('/search/' + ($rootScope.search || '')).replace();
			// $state.go('search', {state: ($rootScope.search || '')})
		}
	}

	$rootScope.play_track = function(id) {
		PlayerService.playTracks([id]);
	};
})

.controller('SearchCtrl', function($rootScope, $scope, $state, $stateParams) {
	var searchTimeout;

	$rootScope.search = $stateParams.search || '';
	$scope.search_artists = [];

	function searchArtist() {
		var search = $rootScope.search;
		console.log(LOGNS, 'Search for', search);
		
		if(!search) {
			$scope.search_artists = [];
			return;
		}

		DZ.api('/search/artist?q=' + encodeURIComponent(search), function(response) {
			console.log(LOGNS, 'search artists', response.data);
			$scope.search_artists = response.data;//.slice(0, 9);
			$scope.$apply();
		});
	}

	var unwatch = $rootScope.$watch('search', function(value, oldValue) {
		if(value != '') {
			console.log(LOGNS, 'watch search value', value);

			clearTimeout(searchTimeout);
			searchTimeout = window.setTimeout(searchArtist, 0600);
		}
	});

	//angular bug fix
	$scope.$on('$destroy', function(){
		unwatch();
	});
})

.controller('ArtistsCtrl', function($scope) {
	
})
 
.controller('ArtistCtrl', function($rootScope, $scope, $state, $stateParams) {
	$scope.albumLimit = 3;
	$scope.albumID;
	$scope.top_songs;
	$scope.songs;

	$scope.reload = function() {
		console.log("RELOAD");
	}

	DZ.api('/artist/' + encodeURIComponent($stateParams.id), function(response){
		console.log(LOGNS, 'artist', $stateParams.id, response);
		if(response.error) { $state.go('error'); return; }

		$scope.artist = response;
		$scope.$apply();
		$rootScope.search = $scope.artist.name;

		DZ.api('/artist/' + $stateParams.id + '/top?limit=10', function(response){
			console.log(LOGNS, 'artist top songs', response.data);
			
			$scope.top_songs = response.data;
			$scope.songs = $scope.top_songs;
			$scope.$apply();
		});

		DZ.api('/artist/' + $stateParams.id + '/albums', function(response){
			console.log(LOGNS, 'artist albums', response.data);

			$scope.albums = response.data;//.slice(0, 6);

			// for(var i in $scope.albums) {
			// 	$scope.albums[i].originalIndex = i;
			// 	$scope.albums[i].order = i;
			// }

			$scope.$apply();
		});
	});

	$scope.selectAlbum = function(id) {
		// if(index < 0 || index >= $scope.albums.length) return;
		// $scope.albums[index].order = new Date().getTime() * -1; //force first position
		$scope.albumID = id;

		DZ.api('/album/' + $scope.albumID + '/tracks', function(response) {
			console.log(LOGNS, 'album tracks', response.data);
			
			$scope.songs = response.data;
			$scope.$apply();
		});
	}
});