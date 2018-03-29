export default function addEvent(eventNew, oauth2Client) {
    console.log(eventNew.invitee_emails);
    let calendar = google.calendar('v3');
    let newEvent = {
        'summary': eventNew.event_name,
        'location': eventNew.location,
        'description': eventNew.description,
        'start': {
            'dateTime': eventNew.start,
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': eventNew.start,
            'timeZone': 'America/Los_Angeles'
        },
        'reminders': {
            'useDefault': true
        },
        'attendees':  eventNew.invitee_emails
    };

    calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        resource: newEvent
    }, function(err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
        }
        console.log('Event created: %s', event.data.htmlLink);
    });

}

// function listEvents(auth) {
//     var calendar = google.calendar('v3');
//     calendar.events.list({
//         auth: auth,
//         calendarId: 'primary',
//         timeMin: (new Date()).toISOString(),
//         maxResults: 10,
//         singleEvents: true,
//         orderBy: 'startTime'
//     }, function(err, response) {
//         if (err) {
//             console.log('The API returned an error: ' + err);
//             return;
//         }
//         var events = response.data.items;
//         if (events.length == 0) {
//             console.log('No upcoming events found.');
//         } else {
//             console.log('Upcoming 10 events:');
//             for (var i = 0; i < events.length; i++) {
//                 var event = events[i];
//                 var start = event.start.dateTime || event.start.date;
//                 console.log('%s - %s', start, event.summary);
//             }
//         }
//     });
// }
