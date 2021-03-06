//See notes in Login.js
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";

//props - function is made in App.js because sessionToken is stored in parent and not all over the app
const Signup = (props) => {
  //these State variables allow us to respond to and control the display of the user-typed info
  //  --into the input fields in our form we return from this component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //this function will eventually do a POST for user info and receive the sessionToken back in a res
  const handleSubmit = (event) => {
    event.preventDefault(); //prevents page refresh when form is submitted
    fetch("http://localhost:3000/user/register", {
      //fetch to server endpoint
      method: "POST",
      body: JSON.stringify({
        user: { username: username, passwordhash: password }, //must match backend
      }),
      //lets server know what type of info we are sending it so it can decide if it can handle it
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    }).then(
      (response) => response.json() //returning promise from fetch and calling json()
      //-- this allows us to return the res into JSON when it revolves.
    ).then((data) => { //resolving .json() promise and taking returned data and calling updateToken
        //--function with returned sessionToken in the data object.
        props.updateToken(data.sessionToken);
    })
  }

  /***********Input onChange**********
   * Functions are callback responding to onChange event listener inserted into input fields
   * these functions are called by event handler (we never call them in code, just define them)
   * they're called with an 'event' object argument (default behavior by any event handler)
   * digging into these event objects let us grab hold of user's typed input data.
   */
  return (
    <div>
      <h1>Sign Up</h1>
      {/* calling handleSubmit function above 
                -- not using parens bc we aren't calling function ourselves (onSubmit handler is)*/}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username"></Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            value={username}
          />
          <FormText>Username is required</FormText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password"></Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            type='password'
          />
        </FormGroup>
        <Button type="submit">Signup</Button>
      </Form>
    </div>
  );
};

export default Signup;