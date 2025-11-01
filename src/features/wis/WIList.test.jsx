import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WIList from "./WIList";
import * as wisSlice from "./wisSlice";
import * as searchSlice from "../search/searchSlice";
import { MemoryRouter } from "react-router-dom";

// Mock react-redux
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

import { useDispatch, useSelector } from "react-redux";

describe("WIList component (mock hooks approach)", () => {
  const mockDispatch = jest.fn();

  const mockWIs = [
    { id: 1, title: "WI 1", product: "Product A", revision: "1.0", status: "Draft" },
    { id: 2, title: "WI 2", product: "Product B", revision: "2.0", status: "Published" },
  ];

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => {
      if (selector === wisSlice.selectWorkInstructions) return mockWIs;
      if (selector === wisSlice.selectLoading) return false;
      if (selector === wisSlice.selectError) return null;
      if (selector === searchSlice.selectSearchTerm) return "";
      if (selector === searchSlice.selectSearchType) return "wis";
      return null;
    });

    jest.spyOn(wisSlice, "fetchWIs").mockReturnValue({ type: "fetchWIs/mock" });
    jest.spyOn(wisSlice, "deleteWIAsync").mockImplementation((id) => ({
      type: "deleteWIAsync/mock",
      payload: id,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("clicking View button calls navigate with correct path", () => {
    render(
      <MemoryRouter>
        <WIList />
      </MemoryRouter>
    );

    const viewButtons = screen.getAllByRole("button", { name: /View/i });
    fireEvent.click(viewButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/view/1");

    fireEvent.click(viewButtons[1]);
    expect(mockNavigate).toHaveBeenCalledWith("/view/2");
    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });


  test("renders work instructions and buttons", () => {
    render(
      <MemoryRouter>
        <WIList />
      </MemoryRouter>
    );

    expect(screen.getByText(/Work Instructions List/i)).toBeInTheDocument();
    expect(screen.getByText(/WI 1/i)).toBeInTheDocument();
    expect(screen.getByText(/WI 2/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /View/i })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /Remove/i })).toHaveLength(2);
  });

  test("dispatches fetchWIs on mount", () => {
    render(
      <MemoryRouter>
        <WIList />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: "fetchWIs/mock" });
  });

  test("dispatches deleteWIAsync when Remove is confirmed", () => {
    window.confirm = jest.fn().mockReturnValue(true);

    render(
      <MemoryRouter>
        <WIList />
      </MemoryRouter>
    );

    const removeButtons = screen.getAllByRole("button", { name: /Remove/i });
    fireEvent.click(removeButtons[0]);

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this WI?"
    );
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "deleteWIAsync/mock",
      payload: 1,
    });
  });

  test("does not dispatch deleteWIAsync when Remove is cancelled", () => {
    window.confirm = jest.fn().mockReturnValue(false);

    render(
      <MemoryRouter>
        <WIList />
      </MemoryRouter>
    );

    const removeButtons = screen.getAllByRole("button", { name: /Remove/i });
    fireEvent.click(removeButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: "deleteWIAsync/mock" })
    );
  });

  test("shows 'No Work Instructions found' when list is empty", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === wisSlice.selectWorkInstructions) return [];
      if (selector === wisSlice.selectLoading) return false;
      if (selector === wisSlice.selectError) return null;
      if (selector === searchSlice.selectSearchTerm) return "";
      if (selector === searchSlice.selectSearchType) return "wis";
      return null;
    });

    render(
      <MemoryRouter>
        <WIList />
      </MemoryRouter>
    );

    expect(screen.getByText(/No Work Instructions found/i)).toBeInTheDocument();
  });
});

