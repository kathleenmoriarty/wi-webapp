// src/components/DemoPage.jsx
import React from "react";
import Dashboard from "../components/Dashboard";
import UserTable from "../features/users/UserTable";
import WIList from "../features/wis/WIList";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import WIUploadForm from "../features/wis/WIUploadForm";
import Searchbar from "../features/search/Searchbar";
import DocumentViewer from "../components/DocumentViewer";

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

        <h2>Demo SearchBar</h2>
        <Searchbar />

        <h2>Demo User Table</h2>
        <UserTable />

        <h2>Demo Work Instructions</h2>
        <WIList />

        <h2>Demo Work Instructions Upload Form</h2>
        <WIUploadForm />

        <h2>Demo Document Viewer</h2>
        <DocumentViewer />
      </div>
    </div>
  );
};

export default DemoPage;
