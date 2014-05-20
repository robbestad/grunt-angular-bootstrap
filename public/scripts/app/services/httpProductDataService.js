//mokklookNs.mokklookApp.service('httpProductDataService', ['$http',
//    function ($http, $error) {
//
//        this.getProduct = function (id, successFn) {
//            $http.get('/api/Recipies/'+id).success(function(data, status, headers, config){
//                successFn(data);
//            })
//            .error(function(data, status, headers, config){
//                console.log(status);
//            })
//        };
//        this.getProduct = function () {
//            $http.get('/api/Recipies').success(function(data, status, headers, config){
//                successFn(data);
//            }).
//            error(function(data, status, headers, config){
//                console.log(status);
//            })
//        };
//
//        return this;
//    }]);

myAppNs.myApp.service('httpProductDataService', ['productValue',
    function (productValue) {

        this.getProduct = function (id, successFn) {
            $http.get('http://myapi.dev/shopadmin/products/' + id).success(function (data, status, headers, config) {
                successFn(data);
            }).
                error(function (data, status, headers, config) {
                    console.log(status);
                });
        };

//        this.getProduct = function (id) {
//            return productValue;
//        };
//        console.log("prodval");
//        console.log(productValue);
      return this;
    }]);