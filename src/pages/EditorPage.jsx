import React from "react";
import Header from "../components/Header"
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Outlet, Link } from "react-router-dom";
import '../styles/EditorPage.css'

const EditorPage = () => {

    const user = useSelector(selectCurrentUser);

    if(!user || user.role !== "Editor") {
        return (
            <div className="access-denied">
                <h2>Access Denied</h2>
                <p>You must be an editor to view this page.</p>
                <Link to="/login">Go to Login</Link>
            </div>
            
        )
    }

    return (
        <div className="editor-layout">
            <Header />
            <div className="editor-content">
                <Navbar />
                <div className="content-container">
                    <Outlet />
                </div>
            </div>
            
            
        </div>
    );
};

export default EditorPage;