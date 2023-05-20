import React, { useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import './HomePage.css'
import { useHistory, Link  } from 'react-router-dom'
const HomePage = () => {
    let { user} = useContext(AuthContext)
    const history = useHistory();
    return (
        <div className="home-container">
            <p>Hello {user.username}, Welcome to our automated AWS pentesting Dashboard! </p>
            <p>In Order to start your mission please make sure you already have the privileges and authorization to run this automated tool</p>
            <p>Please click on the Scan button below</p>
            <Link to ="/scan"><button>Scan</button></Link>

        </div>
    )
}

export default HomePage
