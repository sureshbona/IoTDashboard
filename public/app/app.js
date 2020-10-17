angular.module('myApp', [
    'ckpuraRoutes',
    'ckPuraCtrl',
    'ckpuraPowerCtrl',
    'ckpuraPowerService',
    'ckpuraSoilCtrl',
    'ckpuraSoilService',
    'ckpuraWeatherCtrl',
    'ckpuraWeatherService',
    'ckpuraAdsbCtrl',
    'ckpuraAdsbService',
    'mapCKPuraCtrl',
    'ckpuraLatestCtrl',
    'cspuraRoutes',
    'csPuraCtrl',
    'cspuraPowerCtrl',
    'cspuraPowerService',
    'cspuraSoilCtrl',
    'cspuraSoilService',
    'cspuraWeatherCtrl',
    'cspuraWeatherService',
    'cspuraAdsbCtrl',
    'cspuraAdsbService',
    'mapCSPuraCtrl',
    'cspuraLatestCtrl',
    'angularUtils.directives.dirPagination'
])
    .run(["$rootScope", function($rootScope) {
        $rootScope.$on("$viewContentLoaded", function() {
            componentHandler.upgradeAllRegistered();
        });
    }]);
