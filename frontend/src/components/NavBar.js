import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import './Navbar.css';
import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { FiLogOut, FiUser, FiHome, FiScan, FiLogIn } from "react-icons/fi";
import {AiOutlineSecurityScan, AiOutlineHome} from "react-icons/ai";
import {BiColor, BiHomeAlt} from "react-icons/bi";

const Navigationbar = () => {
  let {user, logoutUser} = useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => setShowDropdown(!showDropdown);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user ? (
            <Link to="/" className="mr-3">
              <AiOutlineHome size={25} />
            </Link>
          ) : (
            <Nav.Link to="/login" className="mr-3">
              <FiLogIn size={25} />
            </Nav.Link>
          )}
          {user && (
            <Link to="/scan" className="mr-3">
              <AiOutlineSecurityScan size={25} />
            </Link>
          )}
        </Nav>
        {user && (
          <Dropdown
            id="user-dropdown"
            show={showDropdown}
            onToggle={handleDropdownToggle}
          >
            <Dropdown.Toggle as={FiUser} size={25} className="user-icon" />

            <Dropdown.Menu id="dropdown-menu">
            <Dropdown.Item disabled style={{ fontWeight: "bold", fontSize: "1em", color: "#333"}}>
              Hello {user.username}
            </Dropdown.Item>
              <Dropdown.Item href="#action/3.2">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                {user ? (
                  <a onClick={logoutUser}>Logout</a>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigationbar;
