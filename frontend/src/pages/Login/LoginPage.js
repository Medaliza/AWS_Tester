import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/AuthContext'
import "./LoginPage.css"
import logo from '../../static/logo.png'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    let {registerUser} = useContext(AuthContext)
    useEffect(() => {
        const signUpButton = document.getElementById("signUp");
        const signInButton = document.getElementById("signIn");
        const container = document.getElementById("container");
    
        signUpButton.addEventListener("click", () => {
          container.classList.add("right-panel-active");
        });
    
        signInButton.addEventListener("click", () => {
          container.classList.remove("right-panel-active");
        });
      }, []);
    return (
    <div class="login-container" id="container">
        <div class="form-container sign-up-container">
            <form onSubmit={registerUser}>
                <h1><img src={logo}/></h1>
                <h1>Create Account</h1>
                <div>
                <input type="text" name="username" placeholder="Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="confirm_password" placeholder="Confirm Password" />
                </div>
                <button type="submit">Sign Up</button>
            </form>
	    </div>
	    <div class="form-container sign-in-container">
                <form onSubmit={loginUser}>
                    <h1><img src={logo}/></h1>
                    <h1>Sign in</h1>
                    <div>
                    <input type="text" name="username" placeholder="Enter Username" required="True"/>
                    <input type="password" name="password" placeholder="Enter Password" required="True"/>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
            <div class="overlay-panel overlay-left">
				<h1>You Already Have an Account!</h1>
				<p>Please login with your personal informations</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Hacker!</h1>
                    <p>If you don't have an account feel free to create one here</p>
                    <button class="ghost" id="signUp" >Sign Up</button>
		        </div>
            </div>
        </div>
    </div>

    )
}

export default LoginPage
