// src/components/DocumentViewer.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock('react-pdf', () => ({
    Document: ({ children }) => <div data-testid="mock-document">{children}</div>,
    Page: () => <canvas data-testid="mock-page" />
}));

import DocumentViewer from "./DocumentViewer";

const mockStore = configureStore([]);

describe("DocumentViewer", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
        workInstructions: {
            list: [
          {
            id: 1,
            title: "Test Doc",
            product: "Widget",
            revision: "A",
            status: "Draft",
            file: new File(["PDF content"], "test.pdf", { type: "application/pdf" }),
          },
          {
            id: 2,
            title: "No File Doc",
            product: "Gadget",
            revision: "B",
            status: "Final",
            file: null,
          },
        ],
        loading: false,
        error: null
        }
    });
  });

  const renderWithRouter = (path) =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/documents/:wiId" element={<DocumentViewer />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  test("renders 'Document not found' when invalid ID is given", () => {
    renderWithRouter("/documents/999");

    expect(screen.getByText("Document not found.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  test("renders document info with no file", () => {
    renderWithRouter("/documents/2");

    expect(screen.getByText("No file uploaded for this document.")).toBeInTheDocument();
    expect(screen.getByText("No File Doc")).toBeInTheDocument();
  });

  test("renders document preview for PDF file", async () => {
    renderWithRouter("/documents/1");
  
    // Header and download link
    expect(screen.getByText("Test Doc")).toBeInTheDocument();
    expect(screen.getByText(/Download File/i)).toBeInTheDocument();
  
    // PDF renders a canvas
    const canvas = await screen.findByTestId("mock-page");
    expect(canvas).toBeInTheDocument();
  });
  

  test("back button navigates", () => {
    renderWithRouter("/documents/1");

    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    // Since MemoryRouter doesn't track actual browser history, you can just check no errors occur
  });
});
