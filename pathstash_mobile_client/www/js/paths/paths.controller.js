/**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var mapList = angular.module('pathstash.paths');

    mapList.controller('mapListController', ['$scope', function ($scope) {
        $scope.title = "This is a test controller title (maplist)";
    }]);

})();