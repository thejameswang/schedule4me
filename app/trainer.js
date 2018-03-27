var apiai = require('apiai');
const bodyParser = require('body-parser')
// var app = apiai(process.env.APIAI_TOKEN);

export default function trainer(app) {

    app.post('/test', function(req, res) {
      var response = req.body.result && req.body.result.parameters && req.body.result.parameters.scheduling ? req.body.result.parameters.echoText : 'There was an issue';
      console.log(response)
      return res.json({
        response,
        displayTest: response,
        source: 'schedule4me'
      })
    })

    var request = app.textRequest('<Your text query>', {
        sessionId: '<unique session id>'
    });

    request.on('response', function(response) {
        console.log(response);
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end();
}
