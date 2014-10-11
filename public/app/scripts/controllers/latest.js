'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
    .controller('LatestVideos', function ($scope) {
// implement magic here
        $http.get('/api/videos/latest').
            success(function (data) {
                $scope.latestVideos = data;
            });
    })
;
