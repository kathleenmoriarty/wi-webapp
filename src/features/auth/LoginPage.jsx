import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectAuthError, selectAuthLoading } from "./authSlice";

const LoginPage = () => {

    const dispatch = useDispatch();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginAsync({ email, password }));
    };
    
    return (
        <div className="login-page">
            <h1>Company Logo</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email}
                    placeholder="abc@provider.com" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Password123*" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />

                <button 
                    type="submit" 
                    onClick={loginHandler}
                    disabled={loading}
                >
                    Log In
                </button>

                {error && <p>{error}</p>}
            </form>
            <p><a href="#">Forgot password?</a></p>
        </div>
    );
};

export default LoginPage;