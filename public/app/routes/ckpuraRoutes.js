angular.module('ckpuraRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'app/views/pages/home.html'
            /*controller: 'luCtrl',
            controllerAs: 'lu'*/
        })

        .when('/ckpura', {
            templateUrl: 'app/views/pages/CKPura/ckpura.html',
            controller: 'ckPuraController',
            controllerAs: 'iot1'
        })

        .when('/iot3', {
            templateUrl: 'app/views/pages/iot3.html',
            controller: 'iot3Controller',
            controllerAs: 'iot3'
        })

        .when('/ckpura/power', {
            templateUrl: 'app/views/pages/CKPura/powermonitoring.html',
            controller: 'ckpuraPowerController',
            controllerAs: 'powermoni'
        })

        .when('/ckpura/soil', {
            templateUrl: 'app/views/pages/CKPura/soilmonitoring.html',
            controller: 'ckpuraSoilController',
            controllerAs: 'soilmoni'
        })

        .when('/ckpura/adsb', {
            templateUrl: 'app/views/pages/CKPura/bsda.html',
            controller: 'ckpuraAdsnController',
            controllerAs: 'adsbmoni'
        })

        .when('/ckpura/weather', {
            templateUrl: 'app/views/pages/CKPura/weathermonitoring.html',
            controller: 'ckpuraWeatherController',
            controllerAs: 'weathermoni'
        })

        .when('/ckpura/waterflow', {
            templateUrl: 'app/views/pages/CKPura/waterflow.html',
            controller: 'ckpuraWaterController',
            controllerAs: 'watermoni'
        })

        .when('/ckpuramap', {
            templateUrl: 'app/views/pages/CKPura/cspuramap.html',
            controller: 'mapCKpuraController',
            controllerAs: 'map'
        });

    $locationProvider.html5Mode(true);
});