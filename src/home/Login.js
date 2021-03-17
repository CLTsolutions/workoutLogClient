//see Signup Notes
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";

//functional component with two state variables to control what a user types into the input fields
//props - function is made in App.js because sessionToken is stored in parent and not all over the app
const Login = (props) => {
  //useStates will be fed info from the form input fields
  //could info grab without state variables, but info uncontrolled by React could produce bugs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); //prevents page refresh when form is submitted
    fetch("http://localhost:3000/user/login", {
      //fetch to server endpoint
      method: "POST",
      body: JSON.stringify({
        user: { username: username, passwordhash: password }, //must match backend
      }),
      //lets server know what type of info we are sending it so it can decide if it can handle it
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(
      (response) => response.json() //returning promise from fetch and calling json()
      //-- this allows us to return the res into JSON when it revolves.
    ).then((data) => { //resolving .json() promise and taking returned data and calling updateToken
        //--function with returned sessionToken in the data object.
        props.updateToken(data.sessionToken);
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username"></Label>
          {/* Input is controlled by React
                -- component doesn't implement any use for setUsername & setPassword
                -- so the input fields will be stuck with no text inside even if user
                -- types in them. 
            -- input fields tied to state variables so they're static (in this case empty) */}
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
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
