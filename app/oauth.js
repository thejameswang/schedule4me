import fs from 'fs';
import { google } from 'googleapis';
import readline from 'readline';
import Calendar from '../models/Calendar';
// import googleAuth from 'google-auth-library';


export default function oauth(app) {

    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/calendar-nodejs-quickstart.json
    var SCOPES = ['https://www.googleapis.com/auth/calendar'];
    var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
        process.env.USERPROFILE) + '/.credentials/';
    var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';
    console.log(process.env.HOME || process.env.HOMEPATH ||
        process.env.USERPROFILE);
    // Load client secrets from a local file.
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the
      // Google Calendar API.
      authorize(JSON.parse(content), addAllDayEvent);

    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];
      var oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
          getNewToken(oauth2Client, callback);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          callback(oauth2Client);
        }
      });
    }


    function getNewToken(oauth2Client, callback) {
      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      console.log('Authorize this app by visiting this url: ', authUrl);
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
          if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
          }
          oauth2Client.credentials = token;
          storeToken(token);
          callback(oauth2Client);
        });
      });
    }

    /**
     * Store token to disk be used in later program executions.
     *
     * @param {Object} token The token to store to disk.
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

function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.data.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}


    function addAllDayEvent(auth) {

      var calendar = google.calendar('v3');
      var event = {
          'summary': 'Google I/O 2018',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',
          'start': {
            'dateTime': '2018-03-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': '2018-03-28T17:00:00-09:00',
            'timeZone': 'America/Los_Angeles'
          },
          'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
          ],
          'reminders': {
            'useDefault': true
          }
        };

        calendar.events.insert({
              auth: auth,
              calendarId: 'primary',
              resource: event,
            }, function(err, event) {
              if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
              }
              console.log('Event created: %s', event.data.htmlLink);
            });

  }
}
