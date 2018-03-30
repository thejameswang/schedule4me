import fs from 'fs';
import {google} from 'googleapis';
import axios from 'axios'
const OAuth2Client = google.auth.OAuth2;
const credentials = JSON.parse(fs.readFileSync('./client_secret.json'));
var clientSecret = credentials.installed.client_secret;
var clientId = credentials.installed.client_id;
var redirectUrl = credentials.installed.redirect_uris[0];
var oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

import readline from 'readline';
import Event from '../models/Event';
import User from '../models/User';
let count = 0;

export default function oauth(bot ,botId, text, user) {

    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/calendar-nodejs-quickstart.json
    var SCOPES = ['https://www.googleapis.com/auth/calendar'];
    var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
    var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

    // Load client secrets from a local file
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    return new Promise((resolve, reject) =>{
      authorize();
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {function} callback The callback to call with the authorized client.
     */
      function authorize() {

          // Check if we have previously stored a token.
          fs.readFile(TOKEN_PATH, function(err, token) {
              if (err) {
                  console.log('This errored in auth')
                  getNewToken();
              } else {
                  // console.log('Does it get here')
                  oauth2Client.setCredentials(JSON.parse(token))
                  // console.log(oauth2Client, 'DOES THIS OWRK')
                  resolve(oauth2Client);
              }
          });
      }

      function getNewToken() {
          console.log("BOT ID:" + botId);
          var authUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES});

          if(count === 0) {
            axios.get('https://slack.com/api/chat.postMessage', {
                params: {
                    token: process.env.SLACKBOT_OAUTH_TOKEN,
                    channel: botId,
                    text: `Please authorize your account with this URL ${authUrl}`,
                    icon_emoji: ':cat:'
                }
            })
            count++;
          }
          if(count=== 1) {
            if (!user) {
                console.log('Message send by bot, ignoring');
                return;
            }
            oauth2Client.getToken(text, function(err, token) {
                if (err) {
                    console.log('does it work in here')
                    reject(err)
                    return;
                }
                storeToken(token);
                oauth2Client.setCredentials(token)
                resolve(oauth2Client);
            });
          }
      }

      /**
       * Store token to disk be used in later program executions.
       */
      function storeToken(token) {
          try {
              console.log(JSON.stringify(token))
              fs.mkdirSync(TOKEN_DIR);
          } catch (err) {
              if (err.code != 'EXIST') {
                  throw err;
              }
          }
          fs.writeFile(TOKEN_PATH, JSON.stringify(token));
          console.log('Token stored to ' + TOKEN_PATH);
      }

    })
}
