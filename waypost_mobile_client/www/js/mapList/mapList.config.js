/**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var mapList = angular.module('waypost.mapList');

    mapList.config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('mapList', {
                url: '/mapList',
                views: {
                    'map-list-default': {
                        templateUrl: 'js/mapList/mapList.html',
                        controller: 'mapListController'
                    }
                }
            });
    }]);

})();
