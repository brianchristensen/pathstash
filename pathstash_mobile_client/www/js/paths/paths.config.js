/**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var paths = angular.module('pathstash.paths');

    paths.config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('paths', {
                url: '/paths',
                templateUrl: 'js/paths/paths.html',
                controller: 'pathsController'
            });
    }]);

})();
