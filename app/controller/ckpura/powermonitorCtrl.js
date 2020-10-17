var firebase = new Firebase("https://powermonitoring-752f4.firebaseio.com/ckpura");

exports.list = function(req, res) {

    console.log('in power monitor controller');

    firebase.once("value", function(snapshot, prevChildKey) {
        var powerMonitorData = snapshot.val();

        var timeArrays=[];
        var powerData = [];

        for(var value in powerMonitorData) {
            var timeArrays = powerMonitorData[value].t.split(',').map(Number);
            var freqArrays = powerMonitorData[value].f.split(',').map(Number);
            var voltArrays = powerMonitorData[value].v.split(',').map(Number);
            var max = Math.max.apply(null, timeArrays);
            var indexs = timeArrays.indexOf(max);
            powerData.push({
                time: timeArrays[indexs],
                freq: freqArrays[indexs]/100,
                volt: voltArrays[indexs]
            });
        }

        res.json(powerData);
    });
};
