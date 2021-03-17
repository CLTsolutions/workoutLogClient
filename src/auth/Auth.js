import React from 'react'; //don't need
import {Container, Row, Col} from 'reactstrap'; //bootstrap tools for grid system
import Login from '../home/Login';
import Signup from '../home/Signup';

//functional component with no state
//hold props being passed down as well as the login/signup forms side by side
const Auth = (props) => {
    return (
        <Container className='auth-container'>
            <Row>
                <Col md='6'>
                    {/* This property (prop) allows us to pass token down to signup function
                        --  not the same as updateToken in App.js (it's a prop associated with a 
                        --  lower component)
                        --Named same to bridge props through the unidirectional flow */}
                    <Signup updateToken={props.updateToken} />
                </Col>
                <Col md='6' className='login-col'>
                    <Login updateToken={props.updateToken} />
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;