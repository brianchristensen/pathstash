/**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var mapList = angular.module('waypost.mapList');

    mapList.controller('mapListController', ['$scope', function ($scope) {
        $scope.title = "This is a test controller title (fuck off will)";
    }]);

})();