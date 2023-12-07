const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    UID: String,
    email: String,
    password: String,
    name: String,
    birthdate: String,
    educationLevel: String,
    subjectOfInterest: Array,
    credit: Number
});

const StudentModel = mongoose.model('students', StudentSchema);

module.exports = StudentModel;  