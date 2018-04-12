
(function(){
  const baseURL ="http://localhost:8080";

  function testAPIs(){
    //test list first
    var testID = '';
    var testJSON = {};

    callAPI('GET', '/api/', null, null)
      .then((list)=>{
        console.log('\n\n**********************\nlist results:');
        console.log(list);
        testID = list[0]._id;

        //create
        let input = document.getElementById('formID')
        let data = new FormData()
        console.log(`in FormData with input.value ${input.elements[0].value}  ${input.elements[1].value}`);
        data.append('first', input.elements[0].value);
        data.append('last', input.elements[1].value);
        data.append('address', input.elements[2].value);
        data.append('city', input.elements[3].value);
        data.append('state', input.elements[4].value);
        callAPI('POST', '/create', null, data)
          .then((student)=>{
            studentId = student._id;
            savedStudent = student; //keep a handle to the created photo object
            console.log('\n\n*********************\ncreate results');
            console.log(student);

        //find
        callAPI('GET', '/students/'+studentId, null, null)
          .then((student)=>{
            console.log('\n\n*********************\nfind results');
            console.log(student);

        //update
        testJSON.description += ' appended by the AJAX API ';
        callAPI('PUT', '/update/'+studentId, null, savedStudent)
           .then((student)=>{
             console.log('\n\n*********************\nupdate results');
             console.log(student);

            //delete
            callAPI('DELETE', '/delete/'+studentID, null, null)
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
        ...(method=='POST' ? {body: body} : {}),
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
      console.log(`in querySelector with input.value ${input.elements[0].value}  ${input.elements[1].value}`);
      testAPIs();
    }else{
      alert("please enter information in all fields");
    }
  });
})();
