// DocumentViewerPDF.jsx
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DocumentViewerPDF = ({ fileURL }) => (
  <Document file={fileURL}>
    <Page pageNumber={1} width={800} />
  </Document>
);

export default DocumentViewerPDF;
