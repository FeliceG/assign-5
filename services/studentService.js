var Student = require('../models/studentModel');

var StudentService = {};

// list
StudentService.list = (studentid)=>{
  return Student.find(studentid)
     .then((students)=>{
       return students;
     }).catch((err)=>{
          throw err;
     });
};

// find -- Render the Edit/Delete page with the information
// for the student specified by the id number
StudentService.read = (id)=>{
  return Student.findById(id)
    .then((student) => {
       return student;
    }).catch((err)=>{
         throw err;
    });
};

// create  -- //Add the student to the database and display on the home page
StudentService.create = (obj)=>{
  var student = new Student(obj);
  return student.save()
   .then((student)=>{
      return student;
    }).catch((err)=>{
        throw err;
    });
};

// Update the information entered for the
// specified student based on student id
StudentService.update = (id, data)=>{
  return Student.findByIdAndUpdate(
    id,
    {$set: data},
    {new: true}
  ).then((student)=>{
     return student;
  }).catch((err)=>{
       throw err;
  });
};

// Delete the student specified by the student id
StudentService.delete = (id)=>{
  return Student.remove({_id: id})
  .then((obj) => {
    return obj;
  }).catch((err)=>{
       throw err;
  });
};

module.exports = StudentService;
