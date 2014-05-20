myAppNs.myApp.service('resourceProductDataService', ['$resource',
    function ($resource) {
        var resource = $resource('http://api.robbestad.com/shopadmin/products/:id', { id: '@id' });

        this.getProduct = function (id) {
            return resource.get({id: id});
        };
        this.getProducts = function () {
            return resource.get();
        };

        return this;
    }]);