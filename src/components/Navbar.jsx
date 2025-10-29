import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";

const Navbar = () => {

    const user = useSelector(selectCurrentUser);

    const getLinksByRole = (role) => {
        switch (role) {
            case "Admin":
                return [
                    {to: "/dashboard", label: "Dashboard"},
                    {to: "/wis", label: "Work Instructions"},
                    {to: "/users", label: "Users"}
                ];
            case "Editor":
                return [
                    {to: "/dashboard", label: "Dashboard"},
                    {to: "wis", label: "Work Instructions"},
                    {to: "/upload", label: "Upload New"}
                ];
            default:
                return [
                    {to: "/dashboard", label: "Dashboard"},
                    {to: "wis", label: "Work Instructions"}
                ]
        }
    }

    const links = user ? getLinksByRole(user.role) : [];

    return (
        <nav>
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;