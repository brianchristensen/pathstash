/**
 * Created by brian on 5/24/15.
 *//**
 * Created by brian on 5/24/15.
 */
(function () {
    'use strict';

    var core = angular.module('waypost.core');

    core.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
        function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            $ionicConfigProvider.tabs.position('bottom');
            $urlRouterProvider.otherwise('/mapList');
    }]);

    core.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

})();
