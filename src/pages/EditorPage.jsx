import React from "react";
import Header from "../components/Header"
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Outlet, Link } from "react-router-dom";


const EditorPage = () => {

    const user = useSelector(selectCurrentUser);

    if(!user || user.role !== "Editor") {
        return (
            <div>
                <h2>Access Denied</h2>
                <p>You must be an editor to view this page.</p>
                <Link to="/login">Go to Login</Link>
            </div>
            
        )
    }

    return (
        <div className="editor-page">
            <Header />
            <Navbar />
            
            <Outlet />
        </div>
    );
};

export default EditorPage;