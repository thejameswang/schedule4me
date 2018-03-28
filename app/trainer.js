import apiai from 'apiai';
import bodyParser from 'body-parser';
var apiaiapp = apiai(process.env.APIAI_TOKEN);

export default function trainer(event) {
    let sender = event.user;
    let message = event.text;
    console.log(sender, 'sending')
    console.log(event.text, 'text')


    return new Promise(function(resolve, reject) {
        let respondingWith;
        let request = apiaiapp.textRequest(message, {
            sessionId: 'schedule4me'
        });

        request.on('response', function(response) {
            let newResponse = JSON.stringify(response);
            respondingWith = JSON.parse(newResponse);
            resolve(respondingWith);
        });

        request.on('error', function(error) {
            console.log(error);
            reject(error);
        });

        request.end();

    });

}
