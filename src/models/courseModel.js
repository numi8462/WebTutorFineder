const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    cid: String,
    subject: String,
    name: String,
    description: String,
    tutorID: String,
    hours: Number,
    status: String,
    cost: Number,
    tutUni: String,
    tutDegree: String,

});

const CourseModel = mongoose.model('courses', CourseSchema);

module.exports = CourseModel;  