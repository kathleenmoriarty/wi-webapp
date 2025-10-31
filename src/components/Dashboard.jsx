import React from "react";
import "../styles/Dashboard.css"

const Dashboard = ({role}) => {
    return (
        <div className="dashboard">
            <h2>Welcome, {role}</h2>
            <p>Use the navigation bar to manage or view content.</p>
        </div>
    );
};

export default Dashboard;