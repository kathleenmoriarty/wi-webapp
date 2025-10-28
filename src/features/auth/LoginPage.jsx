import React from "react";

const LoginPage = () => {
    
    const loginHandler = (e) => {
        e.preventDefault();
        //set email and password using state and use that state for authentication
    };
    
    return (
        <div className="login-page">
            <h1>Company Logo</h1>
            <form action="/login" method="post">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="abc@provider.com" required/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password123*" required />

                <button type="submit" onClick={loginHandler}>Log In</button>
            </form>
            <p><a href="#">Forgot password?</a></p>
        </div>
    );
};

export default LoginPage;