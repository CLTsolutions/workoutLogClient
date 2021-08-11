import { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'

const WorkoutEdit = props => {
  const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description)
  const [editDef, setEditDef] = useState(props.workoutToUpdate.definition)
  const [editRes, setEditRes] = useState(props.workoutToUpdate.result)

  //workoutUpdate takes 2 arguments. 1) avoids page reload, 2) used to specify workout
  //--needing an update in our db
  const workoutUpdate = (event, workout) => {
    event.preventDefault()
    fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
      method: 'PUT',
      //append an object to body of our request w/ a form matching the input expected by our server.
      body: JSON.stringify({
        log: {
          description: editDesc,
          definition: editDef,
          result: editRes,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }),
    })
      //Refetch all workouts so only workouts which haven't been deleted are detected.
      .then(res => {
        props.fetchWorkouts()
        props.updateOff()
      })
  }

  return (
    <Modal isOpen={true}>
      <ModalHeader>Log a Workout</ModalHeader>
      <ModalBody>
        <Form onSubmit={workoutUpdate}>
          <FormGroup>
            <Label htmlFor='result'>Edit Result:</Label>
            <Input
              name='result'
              value={editRes}
              onChange={e => setEditRes(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='description'>Edit Description:</Label>
            <Input
              name='description'
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='definition'>Edit Definition:</Label>
            <Input
              type='select'
              name='definition'
              value={editDef}
              onChange={e => setEditDef(e.target.value)}
            >
              <option></option>
              <option value='Time'>Time</option>
              <option value='Weight'>Weight</option>
              <option value='Distance'>Distance</option>
            </Input>
          </FormGroup>
          <Button type='submit'>Update the workout!</Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default WorkoutEdit
