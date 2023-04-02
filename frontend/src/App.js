import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from './pages/HomePage'
import LoginPage from './pages/Login/LoginPage'
import Navbar from './components/NavBar';
import Sidebar from './components/SideBar';

function App() {
  return (
    <div className="App">
      
      
      <Router>
        <AuthProvider>
          
        <Navbar/>
        <Sidebar/>
          <PrivateRoute component={HomePage} path="/" exact/>
          <Route component={LoginPage} path="/login"/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
