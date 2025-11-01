// src/components/Dashboard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  test("renders with the correct role", () => {
    render(<Dashboard role="Admin" />);

    // Check that the heading contains the role
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Welcome, Admin");

    // Check that the paragraph is rendered
    expect(screen.getByText("Use the navigation bar to manage or view content.")).toBeInTheDocument();
  });

  test("renders different roles correctly", () => {
    render(<Dashboard role="User" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Welcome, User");
  });
});
