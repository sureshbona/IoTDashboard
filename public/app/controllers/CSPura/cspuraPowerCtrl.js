angular.module('cspuraPowerCtrl', ['angularUtils.directives.dirPagination', 'cspuraPowerService'])

    .controller('cspuraPowerController', function(cspuraPower, $scope, $http) {

        const vm = this;

        vm.processing = true;

        vm.v = [];

        cspuraPower.all()
            .success(function(data) {
                vm.processing = false;

                vm.message = 'in power monitoring';

                data.sort(function(a,b){
                        return a.time - b.time;
                    }
                );

                $scope.data = data;

                $scope.sortKey = 'time';
                $scope.reverse = !$scope.reverse;

                const chartData = generateChartData();

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
                            "title": "Frequency",
                            "valueField": "visits",
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
                                "title": "Voltage",
                                "valueField": "hits",
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
                            "categoryBalloonDateFormat": "MMM DD, YYYY JJ:NN:SS"
                        },
                        "categoryField": "date",
                        "categoryAxis": {
                            "minPeriod": "mm",
                            "parseDates": true,
                            "axisColor": "#DADADA",
                            "dashLength": 1,
                            "minorGridEnabled": true
                        },
                        "listeners": [{
                            "event": "rendered",
                            "method": function (e) {
                                var curtain = document.getElementById("curtain");
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
                    const chartData = [];
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
                            visits: data[n].freq,
                            hits: data[n].volt
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

