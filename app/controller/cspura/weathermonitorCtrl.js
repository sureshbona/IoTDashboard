var firebase = new Firebase("https://weathermonitoring-c04fb.firebaseio.com/cspura");

exports.list = function(req, res) {

    console.log('in weather monitor controller');

    firebase.once("value", function(snapshot, prevChildKey) {
        var weatherMonitorData = snapshot.val();
        /*console.log(weatherMonitorData);*/
        var time="";
        var temperature="";
        var humidity="";
        for(var value in weatherMonitorData) {
            time += weatherMonitorData[value].t + ",";
            temperature += weatherMonitorData[value].T + ",";
            humidity += weatherMonitorData[value].H + ",";
            /*console.log(weatherMonitorData[value].t)*/
        }

        var timeArray = time.split(',');
        var temperatureArray = temperature.split(',');
        var humidityArray = humidity.split(',');

        var weatherData = [];
        for(var i=0;i<timeArray.length;i++) {
            if(timeArray[i]!='' || temperatureArray[i]!='' || humidityArray[i]!='') {

                weatherData.push({time: timeArray[i], temp: temperatureArray[i]/100, hum: humidityArray[i]/100});
            }
        }
        /*console.log(weatherData);*/
        res.json(weatherData);
    });
};
