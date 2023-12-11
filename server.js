const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./src/models/studentModel')


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

});

