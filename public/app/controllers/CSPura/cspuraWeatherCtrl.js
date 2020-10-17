google.load('visualization', '1', {
    packages: ['corechart', 'line']
});

angular.module('cspuraWeatherCtrl', ['angularUtils.directives.dirPagination', 'cspuraWeatherService'])

    .controller('cspuraWeatherController', function(cspuraWeather, $scope, $http) {

        const vm = this;

        vm.processing = true;

        vm.v = [];


        cspuraWeather.all()
            .success(function(data) {
                vm.processing = false;

                vm.message = 'in weather monitoring';

                console.log(data);

                $scope.data = data;

                data.sort(function(a,b){
                        return a.time - b.time;
                    }
                );

                $scope.sortKey = 'time';
                $scope.reverse = !$scope.reverse;


                const chartData = generateChartData();

                console.log('------------------');
                console.log(chartData.length);

                if(chartData.length!=0) {

                    const chart = AmCharts.makeChart("spectrum", {
                        "type": "serial",
                        "theme": "light",
                        "legend": {
                            "useGraphSettings": true
                        },
                        "marginRight": 80,
                        "autoMarginOffset": 20,
                        "marginTop": 7,
                        "dataProvider": chartData,
                        "synchronizeGrid": true,
                        "valueAxes": [{
                            "id": "g1",
                            "axisColor": "#FF6600",
                            "axisThickness": 0,
                            "axisAlpha": 1,
                            "position": "left",
                            "includeAllValues": true
                        }],
                        /*"mouseWheelZoomEnabled": true,*/
                        "mouseWheelScrollEnabled": true,
                        "startDuration": 1,
                        "startEffect": "easeOutSine",
                        "sequencedAnimation": false,
                        "graphs": [{
                            "id": "g1",
                            "balloonText": "[[value]]",
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "hideBulletsCount": 50,
                            "lineThickness": 2.59,
                            "lineColor": "#3F51B5",
                            "title": "Temperature",
                            "valueField": "temperature",
                            "useLineColorForBulletBorder": true,
                            "balloon": {
                                "drop": true
                            }
                        },
                            {
                                "id": "g2",
                                "balloonText": "[[value]]",
                                "bullet": "round",
                                "bulletBorderAlpha": 1,
                                "bulletColor": "#FFFFFF",
                                "hideBulletsCount": 50,
                                "lineThickness": 2.59,
                                "lineColor": "#f44336",
                                "title": "Humidity",
                                "valueField": "humidity",
                                "useLineColorForBulletBorder": true,
                                "balloon": {
                                    "drop": true
                                }
                            }],
                        "chartScrollbar": {
                            /*"autoGridCount": true,*/
                            "scrollbarHeight": 40,
                            "oppositeAxis": false
                        },
                        "chartCursor": {
                            "cursorPosition": "mouse",
                            "categoryBalloonDateFormat": "MMM DD, YYYY JJ:NN:SS",
                            "fullWidth": true,
                            "cursorAlpha": 0.1

                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            "gridPosition": "start",
                            "minPeriod": "ss",
                            "parseDates": true,
                            "axisColor": "#DADADA",
                            "dashLength": 1,
                            "minorGridEnabled": true,
                            /*"centerLabelOnFullPeriod": true,*/
                            "autoGridCount": false,
                            "gridCount": 12
                        },
                        "listeners": [{
                            "event": "rendered",
                            "method": function (e) {
                                const curtain = document.getElementById("curtain");
                                curtain.parentElement.removeChild(curtain);
                            }
                        }]/*,
                         "export": {
                         "enabled": true,
                         "position": "bottom-right"
                         }*/

                    });
                }

                chart.addListener("dataUpdated", zoomChart);
                zoomChart();


// generate some random data, quite different range
                function generateChartData() {
                    let chartData = [];
                    const firstDate = new Date();
                    firstDate.setDate(firstDate.getDate() - 100);

                /**for ( var n=0; n<data.length; n++ ) {
                        arrayN.push([new Date(data[n].time * 1000), data[n].temp, data[n].hum]);
                        /!*console.log(new Date(data[n].time));*!/
                    }*/

                    for (let n=0; n<data.length; n++ ) {
                        // we create date objects here. In your data, you can have date strings
                        // and then set format of your dates using chart.dataDateFormat property,
                        // however when possible, use date objects, as this will speed up chart rendering.
                        const newDate = new Date(firstDate);

                        /*newDate.setDate(newDate.getDate() + i);

                        var visits = Math.round(Math.sin(i * 5) * i);
                        var hits = Math.round(Math.random() * 80) + 500 + i * 3;*/

                        /*console.log(newDate);*/

                        chartData.push({
                            date: data[n].time * 1000,
                            temperature: data[n].temp,
                            humidity: data[n].hum
                        });
                    }
                    return chartData;
                }

                function zoomChart(){
                    chart.zoomToIndexes(0, chart.dataProvider.length - 1);
                }



            });

        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa


        }

    });

