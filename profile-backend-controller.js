const express = require('express');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();

// Define Mongoose schema for the collections
const StudentSchema = new Schema({
    UID: Number,
    email: String,
    password: String,
    name: String,
    birthdate: Date,
    educationLevel: String,
    subjectOfInterest: String,
    credit: Number
});

const TutorSchema = new Schema({
    UID: Number,
    qualification: String,
    email: String,
    password: String,
    name: String,
    birthdate: Date,
    credit: Number,
    courses: [
        {
            courseId: Number,
            tutorId: Number,
            subject: String,
            time: String,
            credit: Number,
            isAvailable: Boolean
        }
    ]
});

const CourseSchema = new Schema({
    courseId: Number,
    tutorId: Number,
    subject: String,
    time: String,
    credit: Number,
    isAvailable: Boolean
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://yhk8462:<password>@cluster0.lt8ygbd.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err));

// Mongoose models
const Student = mongoose.model('Student', StudentSchema);
const Tutor = mongoose.model('Tutor', TutorSchema);
const Course = mongoose.model('Course', CourseSchema);

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

// Routes for Student collection
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});

// Routes for Tutor collection
app.get('/tutors', async (req, res) => {
    const tutors = await Tutor.find();
    res.send(tutors);
});

app.post('/tutors', async (req, res) => {
    const tutor = new Tutor(req.body);
    await tutor.save();
    res.send(tutor);
});

// Routes for Course collection
app.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

app.post('/courses', async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.send(course);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));