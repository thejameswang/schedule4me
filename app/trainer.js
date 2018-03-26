var apiai = require('apiai');

var app = apiai(process.env.APIAI_TOKEN);

export default function trainer(app) {

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
