'use strict';

/**
 * @ngdoc overview
 * @name publicApp
 * @description
 * # publicApp
 *
 * Main module of the application.
 */
angular
    .module('publicApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/top', {
                templateUrl: '../views/top.html',
                controller: 'TopVideos'
            }).when('/latest', {
                templateUrl: 'views/latest.html',
                controller: 'LatestVideos'
            }).when('/user', {
                templateUrl: 'views/user.html',
                controller: 'UserVideos'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
