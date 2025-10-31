import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

// Mock useSelector
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Navbar Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing if no user", () => {
    useSelector.mockReturnValue(null);
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders correct links for Admin role", () => {
    useSelector.mockReturnValue({ role: "Admin" });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Work Instructions")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.queryByText("Upload New")).toBeNull(); // should not render Editor link
  });

  test("renders correct links for Editor role", () => {
    useSelector.mockReturnValue({ role: "Editor" });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Work Instructions")).toBeInTheDocument();
    expect(screen.getByText("Upload New")).toBeInTheDocument();
    expect(screen.queryByText("Users")).toBeNull(); // should not render Admin link
  });

  test("renders correct links for default role", () => {
    useSelector.mockReturnValue({ role: "Guest" });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Work Instructions")).toBeInTheDocument();
    expect(screen.queryByText("Users")).toBeNull();
    expect(screen.queryByText("Upload New")).toBeNull();
  });
});
