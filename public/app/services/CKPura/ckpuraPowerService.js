angular.module('ckpuraPowerService', [])

    .factory('ckpuraPower', function($http) {

        var powerFactory = {};

        //get all power monitor data
        powerFactory.all = function() {
            console.log('in powerFactory');
            return $http.get('/ckpuras/power');
        };

        return powerFactory;

    });