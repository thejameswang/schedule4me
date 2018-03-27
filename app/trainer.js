var apiai = require('apiai');
const bodyParser = require('body-parser')
var apiaiapp = apiai(process.env.APIAI_TOKEN);

export default function trainer(event) {
    let sender = event.user;
    let message = event.text;
    console.log(sender)
    console.log(event.text)
    var request = apiaiapp.textRequest(message, {
        sessionId: 'schedule4me'
    });

    request.on('response', function(response) {
        console.log(response);
        let aiText = response.result.fulfillment.speech;
        console.log(aiText)
    });

    request.on('error', function(error) {
        console.log(error);
    });

    // request.end();
}
