// src/features/search/Searchbar.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Searchbar from "./Searchbar";
import { setSearchTerm, setSearchType } from "./searchSlice";

const mockStore = configureStore([]);

describe("Searchbar component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      search: { searchTerm: "", searchType: "wis" },
    });

    store.dispatch = jest.fn(); // Mock dispatch
  });

  test("renders select and input with initial values", () => {
    render(
      <Provider store={store}>
        <Searchbar />
      </Provider>
    );

    // Check select dropdown
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select.value).toBe("wis");

    // Check input field
    const input = screen.getByPlaceholderText(/Search/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  test("dispatches setSearchTerm on input change", () => {
    render(
      <Provider store={store}>
        <Searchbar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(input, { target: { value: "new term" } });

    expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm("new term"));
  });

  test("dispatches setSearchType on select change", () => {
    render(
      <Provider store={store}>
        <Searchbar />
      </Provider>
    );

    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "users" } });

    expect(store.dispatch).toHaveBeenCalledWith(setSearchType("users"));
  });

  test("updates input and select values correctly", () => {
    render(
      <Provider store={store}>
        <Searchbar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Search/i);
    const select = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.change(select, { target: { value: "users" } });

    // Although the store is mocked, we can at least check the dispatched actions
    expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm("test search"));
    expect(store.dispatch).toHaveBeenCalledWith(setSearchType("users"));
  });
});
