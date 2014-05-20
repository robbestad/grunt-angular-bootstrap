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
                templateUrl: 'pages/contact.html'
            });

    });


myAppNs.myApp.run(function ($rootScope) {
    $rootScope.appName = "A Simple Template";
    $rootScope.appDescription = "Getting started with grunt, angularjs and bootstrap.";


});

