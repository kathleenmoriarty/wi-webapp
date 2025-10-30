import React from "react";
import Header from "../components/Header"
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const ViewerPage = () => {
    return (
        <div className="viewer-page">
            <Header />
            <Navbar />

            <Outlet />
        </div>
    );
};

export default ViewerPage;