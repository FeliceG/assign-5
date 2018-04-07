var mongoose = require('mongoose');
var Student = require('../models/studentModel');

//Create the controller
var studentController = {};

class StudentService{

// list
static list(){
  return Student.find({})
     .then((students)=>{
       return students;
     });
}

// find -- Render the Edit/Delete page with the information
// for the student specified by the id number
static read(id){
  return Student.findById(id)
    .then((student) => {
       return student;
    });
}

// create  -- //Add the student to the database and display on the home page
static create(obj){
  var student = new Student(obj);
  return student.save();
}

// Update the information entered for the
// specified student based on student id
static update(id, data){
  return Student.findById(id)
  .then((student) => {
    student.set(data);
    student.save();
    return student;
  });
}

// Delete the student specified by the student id
static delete(id){
  return Student.remove({_id: id})
  .then((obj) => {
    return obj;
  });
}

}

module.exports.Studentservice = StudentService;
module.exports = studentController;
