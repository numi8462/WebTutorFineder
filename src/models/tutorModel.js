const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    uid: String,
    email: String,
    password: String,
    name: String,
    birthdate: String,
    qualification: String,
    uni: String,
    subjects: Array,
    credit: Number,
    gender: String,
    user: String,
    major: String,
    uni: String,

}, { collection: 'tutors' });

const TutorModel = mongoose.model('tutors', TutorSchema);

module.exports = TutorModel;  