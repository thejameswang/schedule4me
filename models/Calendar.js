//required packages
const mongoose = require('mongoose');
//Database mongoose connection
let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const calendarSchema = new mongoose.Schema({
    name: String
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
