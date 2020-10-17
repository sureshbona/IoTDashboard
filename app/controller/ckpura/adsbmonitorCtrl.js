var firebase = new Firebase("https://waterflow.firebaseio.com/flight_adsb");

exports.list = function(req, res) {

    console.log('in adsb monitor controller');

    firebase.once("value", function(snapshot, prevChildKey) {
        var adsbMonitorData = snapshot.val();
        res.json(adsbMonitorData);
    });
};

