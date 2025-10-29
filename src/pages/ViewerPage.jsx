import React from "react";
import Header from "../components/Header"
import Navbar from "../components/Navbar";

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