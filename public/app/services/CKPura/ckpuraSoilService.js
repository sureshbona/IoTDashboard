angular.module('ckpuraSoilService', [])

    .factory('ckpuraSoil', function($http) {

        var soilFactory = {};

        //get all power monitor data
        soilFactory.all = function() {
            console.log('in soilFactory');
            return $http.get('/ckpuras/soil');
        };

        return soilFactory;

    });