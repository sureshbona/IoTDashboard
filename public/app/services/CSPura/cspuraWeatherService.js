angular.module('cspuraWeatherService', [])

    .factory('cspuraWeather', function($http) {

        var weatherFactory = {};

        //get all power monitor data
        weatherFactory.all = function() {
            console.log('in weatherFactory');
            return $http.get('/cspuras/weather');
        };

        return weatherFactory;

    });