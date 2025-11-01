import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminPage from "./AdminPage";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

// Mock react-redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock react-router-dom Outlet
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>Outlet Content</div>,
  Link: ({ children }) => <a href="/login">{children}</a>,
}));

describe("AdminPage", () => {

    const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockImplementation((selector) => {
        if (selector === selectCurrentUser) return { role: "Admin" };
        return null;
    });
  });
  
    afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders access denied for non-admin user", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === selectCurrentUser) return { role: "User" }; // non-admin
      return null;
    });

    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
    expect(screen.getByText(/You must be an admin/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go to Login/i })).toBeInTheDocument();
  });

  test("renders admin layout for admin user", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === selectCurrentUser) return { role: "Admin" }; // admin
      return null;
    });

    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Access Denied/i)).not.toBeInTheDocument();
    expect(screen.getByText("Outlet Content")).toBeInTheDocument();
  });

  test("renders access denied if no user", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === selectCurrentUser) return null; // not logged in
      return null;
    });

    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go to Login/i })).toBeInTheDocument();
  });
});
