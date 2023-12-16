const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./src/models/studentModel')
const TutorModel = require('./src/models/tutorModel')
const CourseModel = require('./src/models/courseModel')


app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://yhk8462:2510@cluster0.lt8ygbd.mongodb.net/tutorfinder?retryWrites=true&w=majority")
.then(() => 
    console.log('Connected to MongoDB'),
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    }))
.catch((err) => console.log('Failed to connect to MongoDB', err));


// Routes for Student collection
app.get('/getStudents', async (req, res) => {
    StudentModel.find()
      .then(students => {
        // console.log(students); // Log the actual data
        res.json(students);
      })
      .catch(err => res.json(err));
});

app.get('/getStudents/:uid', async (req, res) => {
    const uid = req.params.uid;
    StudentModel.findOne({uid: uid})
      .then(students => {
        // console.log(students); // Log the actual data
        res.json(students);
      })
      .catch(err => res.json(err));
});
  

app.post('/postStudents', async (req, res) => {
  const student = new StudentModel(req.body);
    try {
        await student.save();
        res.send(student);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Routes for tutor collection
app.get('/getTutors', async (req, res) => {
  TutorModel.find()
    .then(tutors => {
      res.json(tutors);
    })
    .catch(err => res.json(err));
});

app.get('/getTutors/:uid', async (req, res) => {
  const uid = req.params.uid;
  TutorModel.findOne({uid: uid})
    .then(tutors => {
      res.json(tutors);
    })
    .catch(err => res.json(err));
});


app.post('/postStudents', async (req, res) => {
  const tutor = new TutorModel(req.body);
  try {
      await tutor.save();
      res.send(tutor);
  } catch (err) {
      res.status(500).send(err);
  }
});

//Routes for course collection
app.get('/getCourses', async (req, res) => {
  CourseModel.find()
    .then(courses => {
      res.json(courses);
    })
    .catch(err => res.json(err));
});

app.get('/getCourses/:uid', async (req, res) => {
  const uid = req.params.uid;
  CourseModel.findOne({uid: uid})
    .then(courses => {
      res.json(courses);
    })
    .catch(err => res.json(err));
});


app.post('/postStudents', async (req, res) => {
  const course = new CourseModel(req.body);
  try {
      await course.save();
      res.send(course);
  } catch (err) {
      res.status(500).send(err);
  }
});