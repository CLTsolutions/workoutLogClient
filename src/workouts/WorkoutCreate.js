import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const WorkoutCreate = (props) => {
  const [description, setDescription] = useState("");
  const [definition, setDefinition] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = e => {
    e.preventDefault(); //because handleSubmit will be triggered as form data is submitted, we need
    //to only grab event to prevent the default page reload action
    fetch('http://localhost:3000/log', {
        method: 'POST',
        body: JSON.stringify({
            //packaged description, definition, and result into an object within the body of our post.  
            //Without packaging these exact pieces of data, we would see errors from our server when trying to post a new workout.
            //server expects to find description, definition, and result properties within our request 
                //body, so we must provide them.
            log: {description: description, definition: definition, result: result}
        }),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token //guarded route so must provide token
        })
    })
    .then(res => res.json())
    .then((logData) => {
        console.log(logData);
        //resetting all state variables so user can input a fresh workout to be posted
        setDescription('')
        setDefinition('')
        setResult('')
        props.fetchWorkouts();
    })
  }

  return (
    <>
      <h3>Log a Workout</h3>
      {/* Calling above handleSubmit function */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="description" />
          {/* The value of the input fields is defined by the state of this component. Without a way to change our state, the input values are locked. Hence using the onChange
            - each onChange handler has a defined callback function.
            -These callback functions accept the user event and update state based upon the target.value 
                -- (what the user types */}
          <Input
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="definition" />
          <Input
            type="select"
            name="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          >
            <option value="Time">Time</option>
            <option value="Weight">Weight</option>
            <option value="Distance">Distance</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="result" />
          <Input
            name="result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Click to Submit</Button>
      </Form>
    </>
  );
};

export default WorkoutCreate;
