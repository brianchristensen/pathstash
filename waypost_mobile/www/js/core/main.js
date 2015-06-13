// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('waypost', ['ionic',
    'ngCordova',
    'waypost.mapList',
    'waypost.editor',
    'waypost.map'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('waypost', {
    url: "/waypost",
    abstract: true,
    templateUrl: "js/core/menu.html"
    })

    .state('waypost.mapList', {
        url: "/mapList",
        views: {
            'menuContent': {
                templateUrl: "js/mapList/mapList.html",
                controller: 'mapListCtrl'
            }
        }
    })

    .state('waypost.editor', {
      url: "/editor",
      views: {
          'menuContent': {
              templateUrl: "js/editor/editor.html",
              controller: 'editorCtrl'
          }
      }
    })

    .state('waypost.map', {
      url: "/map",
      views: {
          'menuContent': {
              templateUrl: "js/map/map.html",
              controller: 'mapCtrl'
          }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/waypost/mapList');
});
