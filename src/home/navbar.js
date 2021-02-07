import React, {useState} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

//named sitebar to avoid naming conflict with <Navbar> used from Bootstrap
const Sitebar = (props) => {
    return (
        //Navbar is single parent element with NavbarBrand as its child element.
        <Navbar color="faded" light expand="md">
            <NavbarBrand href='/'>Workout Log</NavbarBrand>
        </Navbar>
    )
}

export default Sitebar;