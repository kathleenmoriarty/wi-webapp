// src/features/users/UserTable.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import UserTable from "./UserTable";
import * as usersSlice from "./usersSlice";
import * as searchSlice from "../search/searchSlice";
import * as ReactRedux from "react-redux";


// Mock react-redux hooks
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("UserTable component", () => {
  let store;
  let mockDispatch;

  const mockUsers = [
    { id: "1", name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: "2", name: "Bob", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  ];

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  
    useSelector.mockImplementation((selector) => {
      if (selector === usersSlice.selectUsers) return mockUsers;
      if (selector === usersSlice.selectUsersLoading) return false;
      if (selector === usersSlice.selectUsersError) return null;
      if (selector === searchSlice.selectSearchTerm) return "";
      if (selector === searchSlice.selectSearchType) return "users";
      return null;
    });
  
    // Mock confirm for removeUser tests
    global.confirm = jest.fn(() => true);
  });
  

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders user list and Add User button", () => {
    render(
     
        <UserTable />
      
    );

    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add User/i })).toBeInTheDocument();
  });

  test("dispatches addUserAsync when Add User button is clicked", () => {
    render(
      
        <UserTable />
      
    );

    fireEvent.click(screen.getByRole("button", { name: /Add User/i }));

    // The last dispatch should be the addUserAsync thunk
    const lastCall = mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1][0];
    expect(typeof lastCall).toBe("function");
  });

  test("dispatches removeUserAsync when Remove button is confirmed", () => {
    render(
      
        <UserTable />
      
    );

    fireEvent.click(screen.getAllByText(/Remove/i)[0]);

    expect(global.confirm).toHaveBeenCalledWith("Are you sure you want to remove this user?");
    const lastCall = mockDispatch.mock.calls[mockDispatch.mock.calls.length - 1][0];
    expect(typeof lastCall).toBe("function");
  });

  test("does not dispatch removeUserAsync when Remove is cancelled", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(ReactRedux, "useDispatch").mockReturnValue(mockDispatch);
    jest.spyOn(global, "confirm").mockReturnValue(false);

    render(
      
        <UserTable />
      
    );

    const removeButtons = screen.getAllByRole("button", { name: /Remove/i });
    fireEvent.click(removeButtons[0]); // click the first "Remove" button


    expect(global.confirm).toHaveBeenCalled();
    // The last dispatch should not be removeUserAsync since confirm returned false
    expect(mockDispatch).not.toHaveBeenCalledWith(expect.any(Function) && expect.stringContaining("removeUserAsync"));
  });

  test("shows loading message when users are loading", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === usersSlice.selectUsersLoading) return true;
      if (selector === usersSlice.selectUsers) return [];
      return null;
    });

    render(
 
        <UserTable />

    );

    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();
  });

  test("shows error message when users loading fails", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === usersSlice.selectUsersLoading) return false;
      if (selector === usersSlice.selectUsersError) return "Failed to load";
      return [];
    });

    render(
 
        <UserTable />
  
    );

    expect(screen.getByText(/Error: Failed to load/i)).toBeInTheDocument();
  });
});

