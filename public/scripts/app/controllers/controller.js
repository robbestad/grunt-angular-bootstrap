(function(){
    'use strict';
})();

var myAppNs = myAppNs || {};

(function () {
    var data;

    myAppNs.myApp.controller('mainController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function mainController($scope, $rootScope, $timeout, $locale, $route) {
            $scope.timeoutHello = "Sample post";
            var promise = $timeout(function () {
                $scope.timeoutHello = "Post sample";
            }, 3500)

            $scope.cancel = function () {
                $timeout.cancel(promise);
                console.log("Cancelled the promise!");
            };




        }]);


})();




(function () {
    var data;
    myAppNs.myApp.controller('contactController',["$scope", "$rootScope", "$timeout", "$locale", "$route",
        function contactController($scope, $rootScope, $timeout, $locale, $route) {

        }]);
})();


