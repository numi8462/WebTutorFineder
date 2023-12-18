const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./src/models/studentModel')
const bodyParser = require('body-parser');
const StudentModel = require('./src/models/studentModel');
const TutorModel = require('./src/models/tutorModel')
const CourseModel = require('./src/models/courseModel')


app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://yhk8462:2510@cluster0.lt8ygbd.mongodb.net/tutorfinder?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
})
.catch((err) => console.log('Failed to connect to MongoDB', err));

async function insert(){
    await StudentModel.create({
        name: "asd",
        email: "asd@gmail.com"
    });
};


app.get('/profile/:uid', async (req, res) => {
    const student = await StudentModel.findOne({ uid: req.params.uid });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.json(student);
  });
  
  app.put('/update/:uid', async (req, res) => {
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { uid: req.params.uid },
      { $set: req.body },
      { new: true }
    );
  
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
  
    res.json(updatedStudent);
  });

//Define route for /profile page
  app.get('/profile', (req, res) => {
    res.send('This is the profile page');
  });



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

app.get('/getCourse/:cid', async (req, res) => {
  const cid = req.params.cid;
  console.log(`Fetching course with cid: ${cid}`)
  CourseModel.findOne({cid: cid})
    .then(courses => {
      res.json(courses);
    })
    .catch(err => res.json(err));
});


app.post('/postCourse', async (req, res) => {
  const course = new CourseModel(req.body);
  try {
      await course.save();
      res.send(course);
  } catch (err) {
      res.status(500).send(err);
  }
});
