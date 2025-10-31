import React from "react";
import Header from "../components/Header"
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import '../styles/ViewerPage.css'

const ViewerPage = () => {
    return (
        <div className="viewer-layout">
            <Header />
            <div className="viewer-content">
                <Navbar />
                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ViewerPage;