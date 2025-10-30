import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/login");
    }
    
    return (
        <header>
            <h1>WI Web App</h1>
            <button onClick={logoutHandler}>Logout</button>
        </header>
    );
};

export default Header;