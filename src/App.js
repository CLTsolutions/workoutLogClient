import React, { useEffect, useState } from 'react';
import Auth from './auth/Auth';
import Sitebar from './home/Navbar';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {
  /*For authenticated requests, you need a token from the server when you sign up/log in. This token 
    -- will be used in all future requests to the server and will allow access to data on the server 
    -- that would otherwise be guarded.*/
  //Best place to store token is in a component with lots of children so it can be passed as a prop 
  // -- to all the child components.
  const [sessionToken, setSessionToken] = useState(''); //starts empty
  //--given value upon logging in, and emptied upon logout
  //setSessionToken  allows us to change sessionToken state variable.

  /* useEffect runs upon initial component load and updates our sessionToken state variable if a
    -- token is saved in localStorage.
  Since an empty arr is passed as a second argument, there is no change to re-run later (so effect 
    -- runs only upon initial component load). */
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  //updateToken takes in token and saves it both in localStorage and state variable, sessionToken
  //State variable allows child components to quickly access sessionToken for use
  //updateToken is written in App.js to store in one place and pass as props to children
  // -- the setSessionToken method we get through arr destructuring of our useState method is only 
  //-- available in App.js, therefore, our updateToken method needs to also be in App.js.
  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  //Determining whether or not a user is logged in based on if a token exists in local storage.
  const clearToken = () => {
    localStorage.clear(); //clearing token from local storage
    setSessionToken(''); //resetting state of sessionToken back to an empty string
  }

  //this function allows something to conditionally display when there's a sessionToken
  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} />
    : <Auth updateToken={updateToken} />) //if no local token, fire auth to try and grab one from the server
    //passing updateToken as prop to Auth component so we can pass this function onto children
    //passed the token prop into Workout Index which allows us to create request methods lower in our 
      //component hierarchy that will need the token to access guarded data (our workouts).
  }
  //More on auth above...
  /*
  When there is no session token, the sessionToken state variable is reset to '' (an empty string) while the localStorage is cleared, erasing our token property. When an object has no property, it's undefined.  Therefore, the empty string stored by our sessionToken state variable is strictly unequal to the undefined token property in localStorage, and our Auth component is fired
  */

  return (
    <div>
      {/* passing clearToken function to Sitebar component */}
      <Sitebar clickLogout={clearToken} />
      {/* Whenever App.js has a state change reloads to the DOM, our protectedViews function should fire */}
      {protectedViews()}
    </div>
  );
}

export default App;