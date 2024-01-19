const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    cid: String,
    tid: String,
    sid: String,
    subject: String,
    cName: String,
    description: String,
    hours: Number,
    hoursLeft: Number,
    totalCost: Number,
    status: Number, // 0 is pending, 1 is approved, 2 is declined, 3 completed, 4 pastSession
    isConfirmed: Boolean,
    isConpleted: Boolean,
});

const SessionModel = mongoose.model('sessions', SessionSchema);

module.exports = SessionModel;  