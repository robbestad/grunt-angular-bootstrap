(function () {
    var data;

    myAppNs.myApp.controller('shopController', ["$scope", "$rootScope", "$timeout", "$locale", "$route", 'resourceProductDataService',
        function shopController($scope, $rootScope, $timeout, $locale, $route, shopService) {

            if (undefined !== $route.current.pathParams.id)
                $scope.product = shopService.getProduct($route.current.pathParams.id);
            else
                $scope.product = shopService.getProduct();
        }

    ]);

})();