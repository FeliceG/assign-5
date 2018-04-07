var express = require('express');
var router = express.Router();
var studentController = require('../../controllers/studentController');
const StudentService = studentController.StudentService;

router.use((req, res, next)=>{
   res.set({'Content-type': 'application/json'});
   next();
 });

// list
router.get('/', (req, res, next)=>{
  StudentService.list()
    .then((students)=>{
      console.log('API: Found students: ${students}');
      res.status(200);
      res.send(JSON.stringify(students));
    }).catch((err)=>{
         console.log('error in list');
         res.status(404);
         res.end();
    });
});

// find
router.get('/:studentid', (req, res, next)=>{
  StudentService.read(req.param.studentid)
    .then((student) => {
       console.log('API: Found student: ${student}');
       res.status(200);
       res.send(JSON.stringify(student));
   }).catch((err)=>{
        res.status(404);
        res.end();
   });
});

//create
router.post('/', (req, res, next)=>{
  var student = {
    first: req.body.first,
    last: req.body.last,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state
  }
  try{
    const studentSave = await StudentService.create(student);
    res.status(201);
    res.send(JSON.stringify(studentSave));
    }.catch((err)=>{
         res.status(404);
         res.end();
    });
});

router.put('/:studentid', (req, res, next)=>{
  console.log('putting ${req.params.studentid}');
  let putdata = req.body;
  StudentService.update(req.params.studentid, putdata)
    .then((updatedStudent)=> {
      res.status(200);
      res.send(JSON.stringify(updatedStudent));
    }).catch((err)=>{
         res.status(404);
         res.end();
    });
});

router.delete('/:studentid', (req, res, next)=>{
  StudentService.delete(req.params.studentid)
    .then((student)=> {
      console.log('API: Deleted student');
      res.status(200);
      res.send(JSON.stringify(student));
    }).catch((err)=>{
         res.status(404);
         res.end();
    });
});

// export our router
module.exports = router;
