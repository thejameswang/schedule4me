// Importing needed npm packages
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import oauth from './app/oauth';
import bot from './app/bot';
import trainer from './app/trainer'

//initializes express
var app = express();

//initializes bodyparser's required code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connects mongo server using personal database login from environmental source
mongoose.connect(process.env.MONGODB_URI);

//initializes database routes, connection checks, and connection functions
oauth(app);
bot();

//Checks for mongo database environmental variables
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
//displays connections
mongoose.connection.on('connected', function() {
    console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
    console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
    process.exit(1);
});

app.get('/', function(req, res) {
    if (req.user) {
        res.json()
    } else {
        res.redirect('/login')
    }
});

app.post('/test', function(req, res) {
  console.log(req.body);
  var response = req.body.result && req.body.result.parameters && req.body.result.parameters.scheduling ? req.body.result.parameters.echoText : 'There was an issue';
  // console.log(response)
  return res.json({
    response,
    displayTest: response,
    source: 'schedule4me'
  })
})


console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
