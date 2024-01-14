const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    uid: String,
    email: String,
    password: String,
    name: String,
    birthdate: Date,
    qualification: String,
    subjects: Array,
    credit: Number,
    gender: String,
    phonenumber: Number,
    user: String
}, { collection: 'tutors' });

const TutorModel = mongoose.model('tutors', TutorSchema);

module.exports = TutorModel;  