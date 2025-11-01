import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Outlet, Link } from "react-router-dom";
import '../styles/EditorPage.css';

// Lazy-load Header and Navbar
const Header = React.lazy(() => import("../components/Header"));
const Navbar = React.lazy(() => import("../components/Navbar"));

const EditorPage = () => {
    const user = useSelector(selectCurrentUser);

    if (!user || user.role !== "Editor") {
        return (
            <div className="access-denied">
                <h2>Access Denied</h2>
                <p>You must be an editor to view this page.</p>
                <Link to="/login">Go to Login</Link>
            </div>
        );
    }

    return (
        <div className="editor-layout">
            <Suspense fallback={<div>Loading header...</div>}>
                <Header />
            </Suspense>

            <div className="editor-content">
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

export default EditorPage;
