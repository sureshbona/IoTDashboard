angular.module('ckpuraWeatherService', [])

    .factory('ckpuraWeather', function($http) {

        var weatherFactory = {};

        //get all power monitor data
        weatherFactory.all = function() {
            console.log('in weatherFactory');
            return $http.get('/ckpuras/weather');
        };

        return weatherFactory;

    });