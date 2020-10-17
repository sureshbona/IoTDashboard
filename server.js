var Firebase = require("firebase");
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});


app.use(morgan('dev'));

var ckpuraRoutes = require('./app/controller/routes/ckpuraRoutes')(app, express);
var cspuraRoutes = require('./app/controller/routes/cspuraRoutes')(app, express);
app.use('/', [ckpuraRoutes, cspuraRoutes]);

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(9003);
console.log('Magic happens on port ' + 9003);
