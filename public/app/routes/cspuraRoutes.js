angular.module('cspuraRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/cspura', {
            templateUrl: 'app/views/pages/CSPura/cspura.html',
            controller: 'csPuraController',
            controllerAs: 'iot2'
        })

        .when('/iot3', {
            templateUrl: 'app/views/pages/iot3.html',
            controller: 'iot3Controller',
            controllerAs: 'iot3'
        })

        .when('/cspura/power', {
            templateUrl: 'app/views/pages/CSPura/powermonitoring.html',
            controller: 'cspuraPowerController',
            controllerAs: 'powermoni'
        })

        .when('/cspura/soil', {
            templateUrl: 'app/views/pages/CSPura/soilmonitoring.html',
            controller: 'cspuraSoilController',
            controllerAs: 'soilmoni'
        })

        .when('/cspura/adsb', {
            templateUrl: 'app/views/pages/CSPura/bsda.html',
            controller: 'cspuraAdsbController',
            controllerAs: 'adsbmoni'
        })

        .when('/cspura/weather', {
            templateUrl: 'app/views/pages/CSPura/weathermonitoring.html',
            controller: 'cspuraWeatherController',
            controllerAs: 'weathermoni'
        })

        .when('/cspura/waterflow', {
            templateUrl: 'app/views/pages/CKPura/waterflow.html',
            controller: 'ckpuraWaterController',
            controllerAs: 'watermoni'
        })

        .when('/cspuramap', {
            templateUrl: 'app/views/pages/CKPura/cspuramap.html',
            controller: 'mapCKpuraController',
            controllerAs: 'map'
        });


    $locationProvider.html5Mode(true);
});
