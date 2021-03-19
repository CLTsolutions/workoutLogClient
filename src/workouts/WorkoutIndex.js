//this component is responsible for conditionally loading the other 3 components and is our splash page.
    //main parents
//The goal is to have a simple splash page active when the user successfully logs in/signs up.
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';

const WorkoutIndex = (props) => {
    //workouts state is an arr that will be filled with workout objects returned from WOL server
    const [workouts, setWorkouts] = useState([]);
    //updateActive used to conditionally display WorkoutEdit component (initialized to boolean value)
    const [updateActive, setUpdateActive] = useState(false);
    //workoutToUpdate will be used as a prop by WorkoutEdit
    //when the user clicks on a row of the WorkoutTable, workoutToUpdate will be switched from an
        //--empty object to the workout object displayed by the row the user clicked on.
        //--WorkoutEdit will use this workout object to request updated workout details to the 
            //--appropriate workout in our database.
    const [workoutToUpdate, setWorkoutToUpdate] = useState({});

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

    //updates our workoutToUpdate state variable based upon the input to this function
    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    }

    //used to toggle our WorkoutEdit display.
    //updateOn is passed as a prop to WorkoutTable, and used when user clicks on Update btn
    const updateOn = () => {
        setUpdateActive(true);
    }

    // used by WorkoutEdit when user has completed or cancelled the workout edit process
    const updateOff = () => {
        setUpdateActive(false);
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
                    <WorkoutCreate 
                        fetchWorkouts={fetchWorkouts} 
                        token={props.token} />
                </Col>
                <Col>
                {/*Why so many props to WorkoutTable?
                    *workouts are the workout objets WorkoutTable will be responsible for mapping to 
                        -- the page
                    *fetchWorkouts allows us to update the workouts shown to the page if the user 
                        -- decides to delete a workout
                    *token is necessary for WorkoutTable to access guarded delete workout endpoint. */}
                    <WorkoutTable 
                        workouts={workouts}
                        editUpdateWorkout={editUpdateWorkout} 
                        updateOn={updateOn}
                        fetchWorkouts={fetchWorkouts} 
                        token={props.token} 
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default WorkoutIndex;
