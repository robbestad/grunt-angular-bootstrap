(function () {
    'use strict';
})();


var myAppNs = myAppNs || {};


angular.module('myApp.factories', ['ngResource'])
    .factory('productFactory', function ($http) {
        return {
            getPageAsync: function (category, callback) {
                var url = 'http://api.robbestad.com/shopadmin/products/' + id + '?callback=JSON_CALLBACK';
                delete $http.defaults.headers.common['X-Requested-With'];
                $http.get(url).success(callback);
            }
        };
    })

    .factory('socket', function ($rootScope) {
        var socket = io.connect('http://192.241.149.86:3000');

        //Override socket.on to $apply the changes to angular
        return {
            on: function (eventName, fn) {
                socket.on(eventName, function (data) {
                    $rootScope.$apply(function () {
                        fn(data);
                    });
                });
            },
            emit: socket.emit
        };
    })

    .factory('articleFactory', function ($http) {

        return {
            getArticleAsync: function (category, id, callback) {
                var url = 'http://nyhetsapiet.robbestad.no/news/' + category + '/' + id + '?callback=JSON_CALLBACK';
                delete $http.defaults.headers.common['X-Requested-With'];
                $http.get(url).success(callback);
            }
        };
    });