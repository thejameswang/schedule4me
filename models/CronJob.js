//required packages
const mongoose = require('mongoose');
//Database mongoose connection
let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const cronJobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    }
});

const CronJob = mongoose.model('CronJob', cronJobSchema);

module.exports = CronJob;
