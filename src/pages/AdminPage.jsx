import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { Outlet, Link } from "react-router-dom";
import '../styles/AdminPage.css';

// Lazy-load Header and Navbar
const Header = React.lazy(() => import("../components/Header"));
const Navbar = React.lazy(() => import("../components/Navbar"));

const AdminPage = () => {
    const user = useSelector(selectCurrentUser);

    if (!user || user.role !== "Admin") {
        return (
            <div className="access-denied">
                <h2>Access Denied</h2>
                <p>You must be an admin to view this page.</p>
                <Link to="/login">Go to Login</Link>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <Suspense fallback={<div>Loading header...</div>}>
                <Header />
            </Suspense>

            <div className="admin-content">
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

export default AdminPage;
