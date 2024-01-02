const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    uid: String,
    email: String,
    password: String,
    name: String,
    birthdate: String,
    educationLevel: String,
    subjectOfInterest: Array,
    credit: Number,
    gender: String,
    user: String,
    bookmark: Array
}, { collection: 'students' });

const StudentModel = mongoose.model('students', StudentSchema);

module.exports = StudentModel;  