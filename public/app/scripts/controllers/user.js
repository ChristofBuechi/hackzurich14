'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
    .controller('UserVideos', function ($scope, $http) {
// implement magic here
        $http.get('/api/videos/bender').
            success(function (data) {
                $scope.UserVideos = data;
            });
    })
;
