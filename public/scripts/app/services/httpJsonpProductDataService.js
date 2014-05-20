myAppNs.myApp.service('resourceProductDataService', ['lookup', '$http',
    function (lookup, $http) {
//        var resource=$http.jsonp('http://myapi.dev/shopadmin/products/:id', { id: '@id' });

//
//        var resource = lookup.get({id: 1}, function(data) {
//           return data;
//        });
////
//        console.log("id "+@id);
//        var resource = 'http://myapi.dev/shopadmin/products/1?callback=JSON_CALLBACK';
//
//        var result =  $http.jsonp(resource).success(function(data) {
//            $scope.product.name = data.name;
//            console.log(data.name);
//        });

        this.getProduct = function (id) {
            var url = 'http://myapi.dev/shopadmin/products/'+id+'?callback=JSON_CALLBACK';
            return  $http.jsonp(url).success(function(data) {
                return $.parseJSON(data);
            });
        };
//        this.getProducts = function () {
//            return resource.query();
//        };

        return this;
    }]);