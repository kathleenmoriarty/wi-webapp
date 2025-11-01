import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WIUploadForm from "./WIUploadForm";
import * as wisSlice from "./wisSlice";
import { useDispatch, useSelector } from "react-redux";

// Mock react-redux
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("WIUploadForm component (mock hooks + async dispatch)", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockImplementation((action) => action); // dispatch returns the action object
  
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => {
      if (selector === wisSlice.selectLoading) return false;
      if (selector === wisSlice.selectError) return null;
      return null;
    });
  
    jest.spyOn(wisSlice, "saveDraftAsync").mockImplementation((payload) => ({
      unwrap: () => Promise.resolve(payload),
    }));
  
    jest.spyOn(wisSlice, "publishWIAsync").mockImplementation((payload) => ({
      unwrap: () => Promise.resolve(payload),
    }));
  });
  

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form inputs and buttons", () => {
    render(<WIUploadForm />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Revision/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Effective Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/File Upload/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save Draft/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("dispatches saveDraftAsync when Save Draft is clicked", async () => {
    render(<WIUploadForm />);

    const titleInput = screen.getByLabelText(/Title/i);
    const productInput = screen.getByLabelText(/Product/i);

    fireEvent.change(titleInput, { target: { value: "Test WI" } });
    fireEvent.change(productInput, { target: { value: "Product X" } });

    fireEvent.click(screen.getByRole("button", { name: /Save Draft/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      const dispatched = mockDispatch.mock.calls[0][0];
      expect(dispatched.unwrap).toBeDefined();
      expect(dispatched.unwrap()).resolves.toMatchObject({
        title: "Test WI",
        product: "Product X",
      });
    });
  });

  test("dispatches publishWIAsync when Submit is clicked", async () => {
    render(<WIUploadForm />);

    const titleInput = screen.getByLabelText(/Title/i);
    const productInput = screen.getByLabelText(/Product/i);

    fireEvent.change(titleInput, { target: { value: "Test WI 2" } });
    fireEvent.change(productInput, { target: { value: "Product Y" } });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      const dispatched = mockDispatch.mock.calls[0][0];
      expect(dispatched.unwrap).toBeDefined();
      expect(dispatched.unwrap()).resolves.toMatchObject({
        title: "Test WI 2",
        product: "Product Y",
      });
    });
  });

  test("shows success message after saveDraftAsync", async () => {
    render(<WIUploadForm />);
  
    fireEvent.click(screen.getByRole("button", { name: /Save Draft/i }));
  
    // wait for the next tick so success state updates
    await waitFor(() => expect(screen.getByText(/Success!/i)).toBeInTheDocument());
  });
  

  test("shows error message if selectError returns an error", () => {
    useSelector.mockImplementation((selector) => {
      if (selector === wisSlice.selectLoading) return false;
      if (selector === wisSlice.selectError) return "Something went wrong";
      return null;
    });

    render(<WIUploadForm />);

    expect(screen.getByText(/Error saving form: Something went wrong/i)).toBeInTheDocument();
  });
});
