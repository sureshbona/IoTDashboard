angular.module('ckpuraLatestCtrl', ['firebase'])

    .controller('ckpuraLatestCtrl', ['$scope', '$firebaseArray', "$timeout",  function($scope, $firbaseArray, $timeout) {

        var weather_firebase = new Firebase(
            "https://weathermonitoring-c04fb.firebaseio.com/Latest_Weather/ckpura_latest"
        );

        var power_firebase = new Firebase(
            "https://powermonitoring-752f4.firebaseio.com/Latest_Power/ckpura_latest"
        );

        var adsb_firebase = new Firebase(
            "https://cxcmap.firebaseio.com/flight_adsb_overwrite"
        );

        var soil_firebase = new Firebase(
            "https://iotdashboardlatest.firebaseio.com/power_monitoring"
        );

        var vm = this;
        vm.message = 'in latest';


        weather_firebase.on("value", function(snapshot, prevChildKey) {
            var data = snapshot.val();

            $timeout(function() {
                $scope.weather_time = moment.unix(data.t).fromNow();
                $scope.weather_temp = data.T/100 + ' \u2103';
                $scope.weather_hum = data.H/100 + ' %';
            });

        });

        power_firebase.on("value", function(snapshot, prevChildKey) {
            var data = snapshot.val();

            $timeout(function() {
                $scope.power_time = moment.unix(data.t).fromNow();
                $scope.power_freq = data.f/100 + ' Hz';
                $scope.power_volt = data.v + ' V';
                $scope.water_time = "N/A";
                $scope.water_flowrate = "N/A";
                $scope.water_totalflow = "N/A";
            });
        });

        adsb_firebase.on("value", function(snapshot, prevChildKey) {
            var data = snapshot.val().data1;
            var sub = data.substring(3,data.length-4);
            var adsb = [];
            adsb = sub.split(',');

            console.log(adsb);
            if(/\S/.test(adsb[1]))
                var adsb_hex = adsb[1];
            else
                var adsb_hex = 'N/A';
            if(/\S/.test(adsb[4]))
                var adsb_flght = adsb[4];
            else
                var adsb_flght = 'N/A';
            if(/\S/.test(adsb[8]) & /\S/.test(adsb[9]))
            var lat_lng = [Number(adsb[8]), Number(adsb[9])];
            else var lat_lng = 'N/A';

            $timeout(function() {
                $scope.adsb_time = "N/A";
                $scope.adsb_flght = "N/A";
                $scope.adsb_hex = "N/A";
                $scope.lat_lng = "N/A";
            });
        });

        soil_firebase.on("value", function(snapshot, prevChildKey) {
            var data = snapshot.val();
            $timeout(function() {
                if(data)
                $scope.water_time = new Date().toLocaleString();
                $scope.water_flowrate = 100 + ' Lpm';
                $scope.water_totalflow = 5000 + ' Litres';
            });
        });

    }]);