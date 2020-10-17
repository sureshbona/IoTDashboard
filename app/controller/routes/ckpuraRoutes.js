var power = require('./../ckpura/powermonitorCtrl');
var soil = require('./../ckpura/soilmoistureCtrl');
var adsb = require('./../ckpura/adsbmonitorCtrl');
var weather = require('./../ckpura/weathermonitorCtrl');

module.exports = function(app, express) {
    
    var ckpuraRouter = express.Router();

    ckpuraRouter.route('/ckpuras/power')
        .get(power.list);

    ckpuraRouter.route('/ckpures/soil')
        .get(soil.list);

    ckpuraRouter.route('/ckpuras/adsb')
        .get(adsb.list);

    ckpuraRouter.route('/ckpuras/weather')
        .get(weather.list);

    return ckpuraRouter;
};