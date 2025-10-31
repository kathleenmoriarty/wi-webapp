// src/components/Header.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

// Mock redux dispatch
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

// Mock react-router navigate
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock logout action
jest.mock("../features/auth/authSlice", () => ({
  logout: jest.fn(() => ({ type: "auth/logout" })),
}));

describe("Header Component with userEvent", () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders title and logout button", () => {
    render(<Header />);
    expect(screen.getByText("WI Web App")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  test("dispatches logout and navigates on button click", async () => {
    const user = userEvent.setup();
    render(<Header />);
    
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await user.click(logoutButton);

    // Expect logout action to be dispatched
    expect(mockDispatch).toHaveBeenCalledWith(logout());
    // Expect navigation to /login
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});

