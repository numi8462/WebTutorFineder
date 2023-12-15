const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./src/models/studentModel')
const bodyParser = require('body-parser');
const StudentModel = require('./src/models/studentModel');



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

insert();
// Routes for Student collection
// app.get('/getStudents', async (req, res) => {
//     StudentModel.find()
//       .then(students => {
//         console.log(students); // Log the actual data
//         res.json(students);
//       })
//       .catch(err => res.json(err));
//   });

// app.post('/postStudents', async (req, res) => {

// });

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

