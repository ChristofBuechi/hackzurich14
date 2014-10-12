'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('TopVideos', function ($scope, $http) {
// implement magic here
        $http.get('/api/videos/top').
            success(function (data) {
                $scope.TopVideos = data;
            });
    })
;
