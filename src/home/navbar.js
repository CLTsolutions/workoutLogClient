import React, { useState } from 'react'
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap'

// named sitebar to avoid naming conflict with <Navbar> used from Bootstrap
const Sitebar = props => {
  const [isOpen, setIsOpen] = useState(false)
  // toggle fn will be used in NavbarToggler (for hamburger menu on mobile)
  const toggle = () => {
    let newIsOpen = !isOpen
    setIsOpen(newIsOpen)
  }

  return (
    // Navbar is single parent element with NavbarBrand as its child element.
    <Navbar color='faded' light expand='md'>
      <NavbarBrand href='/'>Workout Log</NavbarBrand>
      {/* NavbarToggler onClick is calling toggle function above */}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <Button onClick={props.clickLogout}>Logout</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Sitebar
