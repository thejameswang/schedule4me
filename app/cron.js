import schedule from 'node-schedule';
import mongoose from 'mongoose';
import Event from '../models/Event';
import moment from 'moment';
import CronJob from '../models/CronJob';
import axios from 'axios';
import SlackBot from 'slackbots';

let today = moment().startOf('day')
let tomorrow = moment(today).add(1, 'days')

export default function cron() {

    let bot = new SlackBot({token: process.env.SLACKBOT_OAUTH_TOKEN, name: 'ScheduleRightMeow'});

    let j = schedule.scheduleJob('*/1 * * * *', function() {
        Event.find({
            "start": {
                "$gte": today.toDate(),
                $lt: tomorrow.toDate()
            }
        }).then(result => {
            for (let i = 0; i < result.length; i++) {
                CronJob.findOne({_id: result[i].id}).then(res => {
                    if (res) {
                        // Already scheduled job
                    } else {
                        let newReminder = schedule.scheduleJob(new Date(moment(result[i].start).subtract(30, 'minutes')), function() {
                            // console.log("Job scheduled at " + moment(result[i].start).subtract(30, 'minutes').format());
                            // Post message to user
                        });
                        CronJob.create({
                            name: result[i].event_name,
                            _id: result[i].id,
                            start: new Date(result[i].start)
                        }).then(res => {
                            console.log("Created and scheduled new cron job");
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }).catch(function(error) {
            console.log("There's an error: " + error);
        });
    });
}
