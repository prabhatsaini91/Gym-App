'use strict';

angular.module('gym.services',['ngResource'])
.constant("baseURL","http://localhost:3000/")
.factory('exerciseFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    
    return $resource(baseURL + "exercises/:id", null, {
        'update': {
            method: 'PUT'
        }
    });
}])

.factory('routineFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    
    return $resource(baseURL + "routines/:id", null, {
        'update': {
            method: 'PUT'
        }
    });
}])

.factory('dietFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    return $resource(baseURL + "diet/:id", null, {
        'update': {
            method: 'PUT'
        }
    });
}])

;