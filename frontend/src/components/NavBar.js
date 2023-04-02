import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../static/logo.png';
import './Navbar.css';
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Navigationbar = () => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            {user ?
              (<Nav.Link href="#link">Home</Nav.Link>):(<Nav.Link to="/register">Register</Nav.Link>)}
            {user ?
              (<Nav.Link href="#link">Scan</Nav.Link>):(<Nav.Link to="/login">Login</Nav.Link>)}
              {user && 
              <NavDropdown title="User" id="basic-nav-dropdown" auto>
                <NavDropdown.Item>
                {user &&   <span className="pointer-events-none cursor-not-allowed">Hello {user.username}</span>}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                <div>{user ? (<a  onClick={logoutUser}>Logout</a>): (<Link to="/login" >Login</Link>)}</div>
                </NavDropdown.Item>
              </NavDropdown>}


            </Nav>
          </Navbar.Collapse>

    </Navbar>
  )
}

export default Navigationbar;