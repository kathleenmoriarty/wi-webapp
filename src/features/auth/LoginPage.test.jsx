// src/features/auth/LoginPage.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import LoginPage from "./LoginPage";
import * as authSlice from "./authSlice";
import { MemoryRouter } from "react-router-dom";

jest.mock("./authSlice", () => {
    const originalModule = jest.requireActual("./authSlice");
    return {
      ...originalModule,
      loginAsync: jest.fn(() => async (dispatch) => {
        return {
          type: "user/loginAsync/fulfilled",
          payload: { role: "Admin", email: "user@example.com" },
        };
      }), // <- mock loginAsync
      selectAuthLoading: jest.fn(),
      selectAuthError: jest.fn(),
    };
  });
  
  authSlice.loginAsync.fulfilled = {
    match: (action) => action.type === "user/loginAsync/fulfilled",
  };

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("LoginPage", () => {
  let store;
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    const dummyStore = { getState: () => ({ auth: { loading: false, error: null } }), subscribe: () => {}, dispatch: jest.fn() };
  
    mockDispatch = jest.fn(async (thunk) => await thunk(mockDispatch));
    useDispatch.mockReturnValue(mockDispatch);
  
    mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  
    useSelector.mockImplementation((selector) => {
      if (selector === authSlice.selectAuthLoading) return false;
      if (selector === authSlice.selectAuthError) return null;
      return null;
    });
  
    store = dummyStore; // Only needed for <Provider>
  });
  

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders email, password fields and submit button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  test("updates input values when typed into", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "Password123" } });

    expect(screen.getByLabelText(/Email/i).value).toBe("user@example.com");
    expect(screen.getByLabelText(/Password/i).value).toBe("Password123");
  });

  test("successful login dispatches loginAsync and navigates", async () => {
    const fulfilledAction = {
      type: "user/loginAsync/fulfilled",
      payload: { role: "Admin", email: "user@example.com" },
    };

    authSlice.loginAsync.mockImplementation(() => async (dispatch) => fulfilledAction);

  authSlice.loginAsync.fulfilled = {
    match: (action) => action.type === "user/loginAsync/fulfilled",
  };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "Password123" } });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
        expect(authSlice.loginAsync).toHaveBeenCalledWith({
          email: "user@example.com",
          password: "Password123",
        });
        expect(mockNavigate).toHaveBeenCalledWith("/admin");
      });
  });

  test("failed login displays error message", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === authSlice.selectAuthLoading) return false;
      if (selector === authSlice.selectAuthError) return "Invalid credentials";
      return null;
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  test("submit button shows loading when loading is true", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === authSlice.selectAuthLoading) return true;
      if (selector === authSlice.selectAuthError) return null;
      return null;
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/Logging in.../i);
  });
});

