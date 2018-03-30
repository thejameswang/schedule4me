//required packages
const mongoose = require('mongoose');
//Database mongoose connection
let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const eventSchema = new mongoose.Schema({
    event_name: String,
    full_name: String,
    email: String,
    location: String,
    start: Date,
    end: Date,
    invitee_emails: Array,
    description: String,
    user_name: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
