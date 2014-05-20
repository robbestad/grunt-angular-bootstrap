var mokklookNs = myAppNs || {};

var lookupService = angular.module('lookupService', ['ngResource']);

lookupService.factory('lookup', ['$resource',
    function ($resource) {
        return $resource('http://myapi.dev/shopadmin/products/:id', {}, {
            query: {method: 'GET', params: {id: 'id'}, isArray: true}
        });
    }]);

