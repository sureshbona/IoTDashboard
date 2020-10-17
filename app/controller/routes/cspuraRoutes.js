var power = require('./../cspura/powermonitorCtrl');
var soil = require('./../cspura/soilmoistureCtrl');
var adsb = require('./../cspura/adsbmonitorCtrl');
var weather = require('./../cspura/weathermonitorCtrl');

module.exports = function(app, express) {
    
    var cspuraRouter = express.Router();

    cspuraRouter.route('/cspuras/power')
        .get(power.list);

    cspuraRouter.route('/cspuras/soil')
        .get(soil.list);

    cspuraRouter.route('/cspuras/adsb')
        .get(adsb.list);

    cspuraRouter.route('/cspuras/weather')
        .get(weather.list);

    return cspuraRouter;
};