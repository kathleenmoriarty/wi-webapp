import React from "react";

const Dashboard = ({role}) => {
    return (
        <div className="dashboard">
            <h2>Welcome, {role}</h2>
            <p>Use the navigation bar to manage or view content.</p>
        </div>
    );
};

export default Dashboard;