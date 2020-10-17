angular.module('cspuraPowerService', [])

    .factory('cspuraPower', function($http) {

        var powerFactory = {};

        //get all power monitor data
        powerFactory.all = function() {
            console.log('in powerFactory');
            return $http.get('/cspuras/power');
        };

        return powerFactory;

    });