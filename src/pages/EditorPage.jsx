import React from "react";
import Header from "../components/Header"
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Outlet, Link } from "react-router-dom";


const EditorPage = () => {

    const user = useSelector(selectCurrentUser);

    if(!user || user.role !== "Edtior") {
        return <Link to="/login">Go to Login</Link>
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