const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    cid: String,
    tutorId: String,
    studentId: String,
    subject: String,
    name: String,
    description: String,
    hours: Number,
    hoursLeft: Number,
    cost: Number,
    status: Boolean,
});

const SessionModel = mongoose.model('sessions', SessionSchema);

module.exports = SessionModel;  