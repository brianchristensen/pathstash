/**
 * Created by brian on 5/24/15.
 *//**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var mapList = angular.module('waypoint.mapList');

    mapList.config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('mapList', {
                url: '/mapList',
                templateUrl: 'js/mapList/mapList.html',
                controller: 'mapListController'
            });
    }]);

})();
