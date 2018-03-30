import {google} from 'googleapis';

export default function getEvents(oauth2Client) {
    var calendar = google.calendar('v3');
    let today = new Date();
    let upcomingEvents = [];
    return new Promise((resolve, reject) => {
      calendar.events.list({
          auth: oauth2Client,
          calendarId: 'primary',
          timeMin: (today).toISOString(),
          timeMax: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
          maxResults: 50,
          singleEvents: true,
          orderBy: 'startTime'
      }, function(err, response) {
          if (err) {
              console.log('The API returned an error: ' + err);
              reject(err)
              return;
          }
          var events = response.data.items;
          if (events.length == 0) {
              console.log('No upcoming events found.');
          } else {
              console.log(events)
              console.log('Upcoming events for the next week:');
              for (var i = 0; i < events.length; i++) {
                  var event = events[i];
                  var start = event.start.dateTime || event.start.date;
                  upcomingEvents.push({
                      time: start,
                      event: event.summary,
                      description: event.description
                  });
                  console.log('%s - %s', start, event.summary);
              }
              resolve(upcomingEvents);
          }
      });

    })

}
