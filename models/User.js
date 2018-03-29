//required packages
const mongoose = require('mongoose');
//Database mongoose connection
let connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    real_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slack_id: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
