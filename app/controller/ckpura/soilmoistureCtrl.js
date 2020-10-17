var firebase = new Firebase("https://powermonitoring.firebaseio.com/soil");

exports.list = function(req, res) {

    console.log('in soil monitor controller');

    firebase.once("value", function(snapshot, prevChildKey) {
        var soilMonitorData = snapshot.val();
        var time="";
        var vwc="";
        for(var value in soilMonitorData) {
            time += soilMonitorData[value].t + ",";
            vwc += soilMonitorData[value].m + ",";
        }

        var timeArray = time.split(',');
        var vwcArray = vwc.split(',');



        var soilData = [];
        for(var i=0;i<timeArray.length;i++) {
            if(timeArray[i]!='' || vwcArray[i]!='') {
                var timestamp = timeArray[i];
                var date = new Date(timestamp * 1000);
                if(date.getSeconds()<10)
                {
                    var sec = '0'+date.getSeconds();
                }
                else{
                    var sec = date.getSeconds();
                }
                if(date.getHours()<10)
                {
                    var hrs = '0'+date.getHours();
                }
                else{
                    var hrs = date.getHours();
                }
                if(date.getMinutes()<10)
                {
                    var min = '0'+date.getMinutes();
                }
                else{
                    var min = date.getMinutes();
                }
                var datevalues =
                    date.getDate() + '/' +
                    (date.getMonth()+1) + '/' +
                    date.getFullYear() + ', ' +
                    hrs + ':' +
                    min + ':' +
                    sec;
                /*console.log(datevalues);*/
                soilData.push({time: datevalues, vwc: vwcArray[i]*0.01});
            }
        }
        /*console.log(powerData);*/
        res.json(soilData);
    });
};

