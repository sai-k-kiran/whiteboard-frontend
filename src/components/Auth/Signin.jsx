import React, { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import Back from "../Images/back.jpg"

function SignIn() {

  return (
    <>
        <Navbar />
        <div className="login">
            <img className="signin-back" src={Back} />
                <div className="loginContainer">
                    <div className="register-info">
                        <h1>Sign In</h1>
                        
                        <p className="login-foot">
                          New to Whiteboard? <Link to="/register">Create an account</Link>
                        </p>
                    </div>
                </div>
        </div>

    </>
  );
}

export default SignIn;