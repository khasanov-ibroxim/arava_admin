import React from 'react';
import "./login.css"
const Login = () => {


    return (
        <div className="login">
            <div className="form-container">
                <p className="title">Login</p>
                <form className="form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder=""/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder=""/>

                    </div>
                    <button className="sign">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Login;