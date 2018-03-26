'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Calendar = require('./models/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//initializes express
// Importing needed npm packages
var app = (0, _express2.default)();

//initializes bodyparser's required code
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
//connects mongo server using personal database login from environmental source
_mongoose2.default.connect(process.env.MONGODB_URI);

app.get('/', function (req, res) {
    if (req.user) {
        res.json();
    } else {
        res.redirect('/login');
    }
});

console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);