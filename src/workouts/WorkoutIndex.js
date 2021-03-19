//this component is responsible for conditionally loading the other 3 components and is our splash page.
    //main parents
//The goal is to have a simple splash page active when the user successfully logs in/signs up.
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';

const WorkoutIndex = (props) => {
    //workouts state is an arr that will be filled with workout objects returned from WOL server
    const [workouts, setWorkouts] = useState([]);

    //fetchWorkouts gets workouts from the server
    //including auth header (so server knows who is making request and understand them.
        //and token that was passed as a prop from above
    const fetchWorkouts = () => {
        fetch('http://localhost:3000/log', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(res => res.json())
        //after getting back info from the server, we are saving the workout info to our state. 
        .then((logData => {
            setWorkouts(logData)
            // console.log(logData) //making sure server is grabbing an empty arr or workouts
        }))
    }

    //Need to call fetchWorkouts when component mounts
    //A useEffect with an optional second argument of an empty array will call whatever callback we give 
        //the useEffect function only once--as the component initially loads
    //We want to load workouts from fetchWorkouts function automatically (1 time) as the component loads to the DOM. 
    useEffect(() => {
        fetchWorkouts();
    }, [])

    return (
        <Container>
            <Row>
                <Col md='3'>
                    {/* adding a fetchWorkouts prop so we can reload all workouts to 
                        page after WorkoutCreate posts a new workout to the db
                        - Also passing token as a prop so we can access the guarded 
                            workoutlog post endpoint. */}
                    <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
                </Col>
                <Col>
                    <h2>Log a workout to see a table. This will be added in later pages.</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default WorkoutIndex;
