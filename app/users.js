'use strict';
import mongoose from 'mongoose';
import SlackBot from 'slackbots';
import fetch from 'node-fetch';
import axios from 'axios';

import User from '../models/User';

export default function users() {

    let bot = new SlackBot({token: process.env.SLACKBOT_OAUTH_TOKEN, name: 'schedule4me'});

    bot.getUsers().then(function(response) {
        let members = JSON.parse(JSON.stringify(response.members));
        for (let i = 0; i < members.length; i++) {
            if (members[i].is_bot === false && members[i].real_name !== "slackbot") {
                axios.get("https://slack.com/api/users.profile.get?" + `token=${process.env.SLACK_OAUTH}` + "&user=" + members[i].id).then(function(response) {
                    let newUser = {
                        name: members[i].profile.display_name.toLowerCase(),
                        real_name: members[i].real_name,
                        slack_id: members[i].id,
                        email: response.data.profile.email
                    };

                    User.findOneAndUpdate({
                        slack_id: members[i].id
                    },
                    // find a document with that filter
                        newUser, {
                    // document to insert when nothing was found
                        upsert: true,
                        new: true,
                        runValidators: true
                    },
                    // options
                    function(err, user) {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(user);
                        }
                    });

                });
            }
        }
    }).catch(function(error) {
        console.log(error);
    });

}
