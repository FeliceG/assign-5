var express = require('express');
var router = express.Router();
var studentController = require('../../controllers/studentController');
const StudentService = studentController.StudentService;

router.get('/', (req, res, next)=>{
  res.set({'Content-type': 'application/json'});
  next();
}).catch((err)=>{
     res.status(404);
     res.end();
});

// list
router.get('/', (req, res, next)=>{
  StudentService.list()
    .then((students)=>{
      console.log('API: Found students: ${students}');
      res.status(200);
      res.send(JSON.stringify(students));
    }).catch((err)=>{
         res.status(404);
         res.end();
    });
});

// find
router.get('/:studentid', (req, res, next)=>{
  StudentService.read()
    .then((student) => {
       console.log('API: Found student: ${student}');
       res.status(200);
       res.send(JSON.stringify(student));
   }).catch((err)=>{
        res.status(404);
        res.end();
   });
});

router.put('/update/:studentid', (req, res, next)=>{
  StudentService.update()
    .then((student)=> {
      consoloe.log('API: Updated student: ${student}');
      res.status(200);
      res.send(JSON.stringify(student));
    }).catch((err)=>{
         res.status(404);
         res.end();
    });
});

router.post('/update/:studentid', (req, res, next)=>{
  StudentService.delete()
    .then((student)=> {
      consoloe.log('API: Deleted student');
      res.status(200);
      res.send(JSON.stringify(student));
    }).catch((err)=>{
         res.status(404);
         res.end();
    });
});

// export our router
module.exports = api-students;
