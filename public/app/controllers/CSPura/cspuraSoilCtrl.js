angular.module('cspuraSoilCtrl', ['angularUtils.directives.dirPagination', 'cspuraSoilService'])

    .controller('cspuraSoilController', function(cspuraSoil, $scope, $http) {

            var vm = this;
            vm.processing = true;

            vm.v = [];

        cspuraSoil.all()
                .success(function(data) {
                        vm.processing = false;

                        vm.message = 'in soil monitoring';


                        $scope.data = data;

                        $scope.sortKey = 'time';
                        $scope.reverse = !$scope.reverse;

                        console.log(data);

                    var arrayN=[];
                    arrayN.push(['Time', 'VWC']);

                    for ( var n=0; n<data.length; n++ ) {
                        arrayN.push([data[n].time, data[n].vwc]);
                        console.log(typeof data[n].time);
                        console.log(typeof data[n].vwc);
                    }
                    console.log(arrayN);

                    var datachart = google.visualization.arrayToDataTable(arrayN);


                    var view = new google.visualization.DataView(datachart);
                    // set the display parameters
                    var options = {
                        title: 'VWC Vs Time',
                        width: 800,
                        height: 600,
                        bar: { groupWidth: '95%' },
                        legend: { position: 'bottom' },
                        hAxis: { title: 'Time' },
                        vAxis: { title: 'VWC (%)' },
                        backgroundColor: { fill:'transparent' }
                    };


                    // render the chart
                    var chart = new google.visualization.LineChart(document.getElementById('spectrum'));
                    chart.draw(view, options);


                });

            $scope.sort = function(keyname){
                    $scope.sortKey = keyname;   //set the sortKey to the param passed
                    $scope.reverse = !$scope.reverse; //if true make it false and vice versa
            }

    });

