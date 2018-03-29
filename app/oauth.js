import fs from 'fs';
import {google} from 'googleapis';
const OAuth2Client = google.auth.OAuth2;
const credentials = JSON.parse(fs.readFileSync('./client_secret.json'));
var clientSecret = credentials.installed.client_secret;
var clientId = credentials.installed.client_id;
var redirectUrl = credentials.installed.redirect_uris[0];
var oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

import readline from 'readline';
import Event from '../models/Event';
import User from '../models/User';

export default function oauth() {

    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/calendar-nodejs-quickstart.json
    var SCOPES = ['https://www.googleapis.com/auth/calendar'];
    var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
    var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

    // Load client secrets from a local file
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    authorize(addAllDayEvent);
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(callback) {

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, function(err, token) {
            if (err) {
                getNewToken(callback);
            } else {
                oauth2Client.setCredentials(JSON.parse(token))
                callback();
            }
        });
    }

    function getNewToken(callback) {
        var authUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES});
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({input: process.stdin, output: process.stdout});
        rl.question('Enter the code from that page here: ', function(code) {
            rl.close();
            oauth2Client.getToken(code, function(err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.setCredentials(token)
                storeToken(token);
                callback();
            });
        });
    }

    /**
     * Store token to disk be used in later program executions.
     */
    function storeToken(token) {
        try {
            fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to ' + TOKEN_PATH);
    }


return oauth2Client;

}
