const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    uid: String,
    subject: String,
    name: String,
    description: String,
    tutorID: String,
    hours: Int16Array
});

const CourseModel = mongoose.model('courses', CourseSchema);

module.exports = CourseModel;  