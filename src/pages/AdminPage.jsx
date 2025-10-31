import React from "react";
import Header from "../components/Header"
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Outlet, Link } from "react-router-dom";
import '../styles/Header.css'
import '../styles/Navbar.css'
import '../styles/AdminPage.css'

const AdminPage = () => {

    const user = useSelector(selectCurrentUser);

    if(!user || user.role !== "Admin") {
        return (
            <div className="access-denied">
                <h2>Access Denied</h2>
                <p>You must be an admin to view this page.</p>
                <Link to="/login">Go to Login</Link>
            </div>
        )
    }
    return (
        <div className="admin-layout">
            <Header />
            <div className="admin-content">
                <Navbar />
                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </div>
        
    );
};

export default AdminPage;