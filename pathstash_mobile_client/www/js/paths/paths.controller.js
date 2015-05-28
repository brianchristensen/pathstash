/**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var paths = angular.module('pathstash.paths');

    paths.controller('pathsController', ['$scope', function ($scope) {
        $scope.title = "This is a test controller title (fuck off will)";
    }]);

})();