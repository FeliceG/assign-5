
(function(){
  const baseURL ="http://104.236.207.206:8080";

  function testAPIs(){
    //test list first
    var testID = '';
    var testJSON = {};

    callAPI('GET', '/api/list', null, null)
      .then((list)=>{
        console.log('\n\n**********************\nlist results:');
        console.log(list);
        testID = list[0]._id;

        //create
        let input = document.getElementById('formID')
        let data = {
          first: input.elements[0].value,
          last: input.elements[1].value,
          address: input.elements[2].value,
          city: input.elements[3].value,
          state: input.elements[4].value
        };

        callAPI('POST', '/api/create', null, data)
          .then((student)=>{
            studentId = student._id;
            savedStudent = student; //keep a handle to the created photo object
            console.log('\n\n*********************\ncreate results');
            console.log(student);

        //find
        callAPI('GET', '/api/student/'+studentId, null, null)
          .then((student)=>{
            console.log('\n\n*********************\nfind results');
            console.log(student);

        //update
        testJSON.description += ' appended by the AJAX API ';
        callAPI('PUT', '/api/update/'+studentId, null, savedStudent)
           .then((student)=>{
             console.log('\n\n*********************\nupdate results');
             console.log(student);

            //delete
            callAPI('DELETE', '/api/delete/'+studentId, null, null)
              .then((result)=>{
                console.log('\n\n*********************\ndelete results');
                console.log(result);
              })
           });
        });
     });
  })
  .catch((err)=>{
    console.error(err);
  });
}

async function callAPI(method, uri, params, body){
    jsonMimeType = {
      'Content-type':'application/json'
    }
    try{
      /*  Set up our fetch.
       *   'body' to be included only when method is POST
       *   If 'PUT', we need to be sure the mimetype is set to json
       *      (so bodyparser.json() will deal with it) and the body
       *      will need to be stringified.
       *   '...' syntax is the ES6 spread operator.
       *      It assigns new properties to an object, and in this case
       *      lets us use a conditional to create, or not create, a property
       *      on the object. (an empty 'body' property will cause an error
       *      on a GET request!)
       */
      var response = await fetch(baseURL + uri, {
        method: method, // GET, POST, PUT, DELETE, etc.
        ...(method=='POST' ? {headers: jsonMimeType, body:JSON.stringify(body)}  : {}),
        ...(method=='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
      });
      return response.json(); // parses response to JSON
    }catch(err){
      console.error(err);
      return "{'status':'error'}";
    }
  }

  // Calls our test function when we click the button
  //  afer validating that there's a file selected.
  document.querySelector('#addStudent').addEventListener("click", ()=>{
    let input = document.getElementById('formID')
    if (input.elements[0].value){
      testAPIs();
    }else{
      alert("please enter information in all fields");
    }
  });
})();
