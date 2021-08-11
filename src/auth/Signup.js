// See notes in Login.js
import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap'

// props - fn is made in App.js bc sessionToken is stored in parent and not all over the app
const Signup = props => {
  // State variables allow us to respond to and control the display of the user-typed info
  // -- into the input fields in our form we return from this component
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // this fn does a POST for user info and receive the sessionToken back in a res
  const handleSubmit = event => {
    // prevents page refresh when form is submitted
    event.preventDefault()
    fetch('http://localhost:3000/user/register', {
      // fetch to server endpoint
      method: 'POST',
      body: JSON.stringify({
        // must match backend
        user: { username: username, passwordhash: password },
      }),
      // lets server know what type of info being sent it so it can decide if it can handle it
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      //  returning promise from fetch and calling json()
      // -- this allows us to return the res into JSON when it revolves.
      .then(response => response.json())
      // --fn with returned sessionToken in the data object.
      // resolving .json() promise and taking returned data and calling updateToken
      .then(data => {
        props.updateToken(data.sessionToken)
      })
  }

  /***********Input onChange**********
   * Fns are callback responding to onChange event listener inserted into input fields
   * these fns are called by event handler (we never call them in code, just define them)
   * they're called with an 'event' obj argument (default behavior by any event handler)
   * digging into these event objects let us grab hold of user's typed input data.
   */
  return (
    <div>
      <h1>Sign Up</h1>
      {/* calling handleSubmit fn above
        -- not using parens bc we aren't calling fn ourselves (onSubmit handler is)*/}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='username'></Label>
          <Input
            onChange={e => setUsername(e.target.value)}
            name='username'
            value={username}
          />
          <FormText>Username is required</FormText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'></Label>
          <Input
            onChange={e => setPassword(e.target.value)}
            name='password'
            value={password}
            type='password'
          />
        </FormGroup>
        <Button type='submit'>Signup</Button>
      </Form>
    </div>
  )
}

export default Signup
