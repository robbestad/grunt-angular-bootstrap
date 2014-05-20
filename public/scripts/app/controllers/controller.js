(function(){
    'use strict';
})();

var myAppNs = myAppNs || {};

(function () {
    var data;

    myAppNs.myApp.controller('mainController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function mainController($scope, $rootScope, $timeout, $locale, $route) {

            $scope.heading_text = "Getting started";


        }]);


})();




(function () {
    var data;
    myAppNs.myApp.controller('contactController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function contactController($scope, $rootScope, $timeout, $locale, $route) {
         $scope.heading_text = "Contact";

        }]);
})();


