// Importing needed npm packages
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import oauth from './app/oauth';
import bot from './app/bot';
import trainer from './app/trainer'
import users from './app/users'
import cron from './app/cron'

//initializes express
var app = express();

//initializes bodyparser's required code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connects mongo server using personal database login from environmental source
mongoose.connect(process.env.MONGODB_URI);

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

cron();
users();
//initializes database routes, connection checks, and connection functions
bot(app);

app.get('/', function(req, res) {
    if (req.user) {
        res.json()
    } else {
        res.redirect('/login')
    }
});

app.post('/test', function(req, res) {
  console.log(req.body);
  var response = req.body.result && req.body.result.parameters ? req.body.result.parameters.parameters : 'There was an issue';
  return res.json({
    response,
    displayTest: response,
    source: 'schedule4me',
    sessionId: 'schedule4me'
  })
})

app.post('/response', function(req, res) {
  console.log(req.body);
  return res.json({
    ok: true,
    response: req.body
  })
  // var response =
  // return res.json({
  //   response,
  //   displayTest: response,
  //   source: 'schedule4me',
  //   sessionId: 'schedule4me'
  // })
})



console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
