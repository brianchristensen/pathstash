/**
 * Created by brian on 5/27/15.
 */
(function () {
    'use strict';

    var map = angular.module('waypost.map');

    map.controller('mapController', ['$scope', function ($scope) {
        $scope.title = "This is a test controller title (map)";
    }]);

})();