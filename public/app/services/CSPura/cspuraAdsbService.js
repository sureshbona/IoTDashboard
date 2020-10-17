angular.module('cspuraAdsbService', [])

    .factory('Adsb', function($http) {

        var adsbFactory = {};

        //get all power monitor data
        adsbFactory.all = function() {
            console.log('in adsbFactory');
            return $http.get('/cspuras/adsb');
        };

        return adsbFactory;

    });