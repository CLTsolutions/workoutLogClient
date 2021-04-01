//this component displays our workout and has buttons to edit and delete workouts.
//We defined our functions making API calls in WorkoutIndex so this component can be a 
    //--functional component (since we don't need to deal with the state at all).

import { Button, Table } from "reactstrap"

const WorkoutTable = (props) => {
    //since this is a functional component, we only need to deal with the return ot display
        //--the workout info in the format we want it in.

    //deleteWorkout expects a workout (it needs to know which workout to make delete request for).
    //delete request is a guarded endpoint so token is passed from App to WorkoutIndex to WorkoutTable
    const deleteWorkout = (workout) => {
        fetch(`http://localhost:3000/log/${workout.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        //Refetch all workouts so only workouts which haven't been deleted are detected.
        .then(() => props.fetchWorkouts())
    }

    const workoutMapper = () => {
        //mapping through our props.workouts arr.  
        //props.workouts refers to the workouts pulled from our back-end (objects containing 
            //--individual workout data
        //Our callback function, with params 'workout' and 'index' is defined according to the 
            //--callback function of all .map methods: 'workout' will represent every workout object 
            //--in our props.workouts arr each time the map loop runs, while 'index' is the index 
            //--number of that workout object in the workouts arr.
        //.map needs a return for every element in the arr mapped over (read MDN docs)
        //For every workout object, a new <tr> is created. React throws warning if there is no unique 
            //--key to repeated JSX elements so we use the index number of every workout as a unique 
            //--identifier for that <tr>
        return props.workouts.map((workout, index) => {
            return (
                <tr key={index}>
                    <th scope='row'>{workout.id}</th>
                    <td>{workout.result}</td>
                    <td>{workout.description}</td>
                    <td>{workout.definition}</td>
                    <td>
                        {/* using the functions passed as props from WorkoutIndex */}
                        <Button 
                            color='warning' 
                            onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}}
                        >Update</Button>
                        {/* onClick takes a callback function defined in our JSX.
                            - It calls deleteWorkout with a 'workout' argument, which is defined 
                                -- through our .map in workoutMapper. */}
                        <Button 
                            color='danger' 
                            onClick={() => {deleteWorkout(workout)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
        <h3>Workout History</h3>
        <hr />
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Result</th>
                    <th>Description</th>
                    <th>Definition</th>
                </tr>
            </thead>
            <tbody>
                {workoutMapper()}
            </tbody>
        </Table>
        </>
    )
}

export default WorkoutTable;