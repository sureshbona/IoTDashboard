var cities = [
    {
        lat : 13.15510344871489,
        long : 76.8913783505559
    }
];

angular.module('mapCSPuraCtrl', [])

 .controller('mapCSPuraController', ['$scope', function($scope) {

     var mapOptions = {
         zoom: 10,
         center: new google.maps.LatLng(13.15510344871489,76.8913783505559),
         scrollwheel: false,
         mapTypeControl: false,
         scaleControl: false
     };

     $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
     $scope.markers = [];

     var createMarker = function (info){

         var marker = new google.maps.Marker({
             map: $scope.map,
             position: new google.maps.LatLng(13.152857,76.889991)
         });

         $scope.markers.push(marker);

     };

     for (var i = 0; i < cities.length; i++){
         createMarker(cities[i]);
     }

 }]);