const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    UID: String,
    email: String,
    password: String,
    name: String,
    birthdate: String,
    qalification: String,
    subjects: Array,
    credit: Number,
    gender: String
});

const TutorModel = mongoose.model('tutors', StudentSchema);

module.exports = TutorModel;  