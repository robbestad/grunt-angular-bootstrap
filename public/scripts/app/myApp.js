"use strict";

var myAppNs = myAppNs || {};

myAppNs.myApp = angular.module('myApp', ['ngRoute', 'ngResource'],
    function ($routeProvider) {

        $routeProvider.when('/',
            {
                controller: 'mainController',
                templateUrl: 'pages/start.html'
            });

        $routeProvider.when('/contact',
            {
                controller: 'contactController',
                templateUrl: 'pages/kontakt.html'
            });

        $routeProvider.when('/shop', {
            templateUrl: 'pages/shop.html',
            controller: 'shopController',
            resolve: {
                product: ['$route', 'resourceProductDataService', function ($route, dataService) {
                    return dataService.getProducts().$promise;
                }]
            }
        });

        $routeProvider.when('/shop/:id', {
            templateUrl: 'pages/shop.html',
            controller: 'shopController',
            resolve: {
                product: ['$route', 'resourceProductDataService', function ($route, dataService) {
                    return dataService.getProduct($route.current.pathParams.id).$promise;
                }]
            }
        });
    });


myAppNs.myApp.run(function ($rootScope) {
    $rootScope.appName = "A Simple Template";
    $rootScope.appDescription = "Getting started with grunt, angularjs and bootstrap.";

    var hasIDB = typeof window.indexedDB != 'undefined';
    var hasLS = typeof window.localStorage != 'undefined';
    if(hasIDB){
        $rootScope.appName = "Powered by IndexedDB";
    }
    else if(hasLS) {
        $rootScope.appName = "Powered by Local Storage";
    }
    else if(hasLS) {
        $rootScope.appName = "Your browser sucks";
    }

    localforage.setItem('author', 'anders', doSomethingElse);
    function doSomethingElse(){
        $rootScope.appName = "Powered by local forage";


        // Async, fast, and non-blocking!
        localforage.getItem('author', printName);

    }

    function printName(name){
        $rootScope.appName = name;


    }

});

