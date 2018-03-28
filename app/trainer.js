import apiai from 'apiai';
import bodyParser from 'body-parser';
var apiaiapp = apiai(process.env.APIAI_TOKEN);

export default function trainer(event) {
    let sender = event.user;
    let message = event.text;
<<<<<<< HEAD
    console.log(sender, 'sending')
    console.log(event.text, 'text')
=======
>>>>>>> 61edb0d3b81ffdcca53a2a4d3a3844f74f00cc49


    return new Promise(function(resolve, reject) {
        let respondingWith;
        let request = apiaiapp.textRequest(message, {
            sessionId: 'schedule4me'
        });

<<<<<<< HEAD
    request.on('response', function(response) {
        // console.log(response, 'given response that comes back');
        response.user = sender;
        // let aiText = response.result.fulfillment.speech;
        // console.log(aiText)
        console.log(response)
        return response
    });
=======
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
>>>>>>> 61edb0d3b81ffdcca53a2a4d3a3844f74f00cc49

    });

}
