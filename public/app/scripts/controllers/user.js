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
        $scope.UserVideos = [];
        $scope.selectedUser = "";


// implement magic here
        $http.get('/api/users').success(function (data) {
                $scope.userlist = data;
            });

        console.log("Test");


        $scope.getVideosofUser = function(user) {
            console.log("test inside function");
            $http.get('/api/videos/' + user).
                success(function (data) {
                    $scope.UserVideos = data;
                });
        };
    });
