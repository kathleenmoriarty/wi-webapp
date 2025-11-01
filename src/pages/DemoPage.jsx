// src/components/DemoPage.jsx
import React from "react";
import Dashboard from "./Dashboard";
import UserTable from "../features/users/UserTable";
import WIList from "../features/wis/WIList";
import Navbar from "./Navbar";
import Header from "./Header";

const DemoPage = () => {
  return (
    <div>
      {/* Navbar and header */}
      <Navbar />
      <Header />

      {/* Main content */}
      <div style={{ padding: "1rem" }}>
        <h2>Demo Dashboard</h2>
        <Dashboard role="Admin" />

        <h2>Demo User Table</h2>
        <UserTable />

        <h2>Demo Work Instructions</h2>
        <WIList />
      </div>
    </div>
  );
};

export default DemoPage;
