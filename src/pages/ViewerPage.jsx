import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import '../styles/ViewerPage.css';

// Lazy-load Header and Navbar
const Header = React.lazy(() => import("../components/Header"));
const Navbar = React.lazy(() => import("../components/Navbar"));

const ViewerPage = () => {
    return (
        <div className="viewer-layout">
            <Suspense fallback={<div>Loading header...</div>}>
                <Header />
            </Suspense>

            <div className="viewer-content">
                <Suspense fallback={<div>Loading navigation...</div>}>
                    <Navbar />
                </Suspense>

                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ViewerPage;
