angular.module('cspuraSoilService', [])

    .factory('cspuraSoil', function($http) {

        var soilFactory = {};

        //get all power monitor data
        soilFactory.all = function() {
            console.log('in soilFactory');
            return $http.get('/cspuras/soil');
        };

        return soilFactory;

    });