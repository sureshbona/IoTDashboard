var cities = [
    {
        lat : 14.054,
        long : 77.1665
    }
];

angular.module('mapCKPuraCtrl', [])

 .controller('mapCKPuraController', ['$scope', function($scope) {

     var mapOptions = {
         zoom: 10,
         center: new google.maps.LatLng(14.054,77.1665),
         scrollwheel: false,
         mapTypeControl: false,
         scaleControl: false
     };

     $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
     $scope.markers = [];

     var createMarker = function (info){

         var marker = new google.maps.Marker({
             map: $scope.map,
             position: new google.maps.LatLng(14.054,77.1665)
         });

         $scope.markers.push(marker);

     };

     for (var i = 0; i < cities.length; i++){
         createMarker(cities[i]);
     }

 }]);