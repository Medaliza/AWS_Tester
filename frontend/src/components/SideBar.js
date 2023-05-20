
//import useState hook to create menu collapse state
import React, { useState, useContext } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaListAlt, FaHome, FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import {MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import {AiOutlineHome} from "react-icons/ai";
import {BiHistory} from "react-icons/bi";
import {FaAws} from "react-icons/fa";
import logo from '../static/logo.png';
import AuthContext from '../context/AuthContext'

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import { Link, useHistory } from "react-router-dom";


    const Sidebar = () => {
    let { logoutUser} = useContext(AuthContext)
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);

     };
    const history = useHistory();
    const handleClick = (menuItem) => {
        setActiveMenuItem(menuItem);
        switch (menuItem) {
          case "home":
            history.push("/");
            break;
          case "scan":
            history.push("/scan");
            break;
          case "history":
            history.push("/history");
            break;
          default:
            break;
      }};
    const [activeMenuItem, setActiveMenuItem] = useState('home');
  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
            <img src={logo} alt="logo" className="sidelogo" />
            {!menuCollapse && <span className="brand-name" >AWS_TESTER</span>}
            
              {/* small and big change using menucollapse state */}
              {/* <img src={menuCollapse ? logo : "bigLogo" } alt="logo" className="sidelogo" /> */}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <MdKeyboardArrowRight/>
              ) : (
                <MdKeyboardArrowLeft/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={activeMenuItem === 'home'} onClick={() => handleClick('home')} icon={<AiOutlineHome className="icon" />}>
              <span className="menu-item">Home</span>
            </MenuItem>

            <MenuItem active={activeMenuItem === 'scan'} onClick={() => handleClick('scan')} icon={<FaAws className="icon" />} >
              <span className="menu-item">Scan</span>
            </MenuItem>

            <MenuItem active={activeMenuItem === 'history'} onClick={() => handleClick('history')} icon={<BiHistory className="icon" />}>
              <span className="menu-item">History</span>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem onClick={logoutUser} icon={<FiLogOut className="icon" />}>
              <span className="menu-item">Logout</span>
            </MenuItem>
          </Menu>
        </SidebarFooter>

        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;