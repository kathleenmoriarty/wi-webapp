import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectAuthError, selectAuthLoading } from "./authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    
    const loginHandler = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginAsync({ email, password }));
        
        if(loginAsync.fulfilled.match(result)) {
            const role = result.payload.role;
            navigate(`/${role.toLowerCase()}`);
        }
    };
    
    return (
        <div className="login-page">
            <h1>Company Logo</h1>
            <form onSubmit={loginHandler}>
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
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>

                {error && <p className="error">{error}</p>}
            </form>
            <p><a href="#">Forgot password?</a></p>
        </div>
    );
};

export default LoginPage;