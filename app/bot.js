'use strict';
import trainer from './trainer'

let SlackBot = require('slackbots');

export default function bot() {

    let bot = new SlackBot({
        token: process.env.SLACKBOT_OAUTH_TOKEN,
        name: 'My Bot'
    });

    // bot.run();

    // bot.on('start', function() {
    //     // more information about additional params https://api.slack.com/methods/chat.postMessage
    //         var params = {
    //             icon_emoji: ':cat:'
    //         };
    //
    //         // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    //         bot.postMessageToChannel('general', 'meow!', params);
    //
    //         // define existing username instead of 'user_name'
    //         bot.postMessageToUser('user_name', 'meow!', params);
    //
    //         // If you add a 'slackbot' property,
    //         // you will post to another user's slackbot channel instead of a direct message
    //         bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });
    //
    //         // define private group instead of 'private_group', where bot exist
    //         bot.postMessageToGroup('private_group', 'meow!', params);
    // });

    /**
     * @param {object} data
     */
    bot.on('message', function(data) {
        // all ingoing events https://api.slack.com/rtm

        if (typeof(data.text) !== "undefined") {
            trainer(data)
            console.log(data.text);
        }

    });

}
