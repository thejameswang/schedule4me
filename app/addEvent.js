import {google} from 'googleapis';

export default function addEvent(eventNew, oauth2Client) {
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
