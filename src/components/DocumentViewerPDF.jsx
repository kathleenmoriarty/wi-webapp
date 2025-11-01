// DocumentViewerPDF.jsx
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

const DocumentViewerPDF = ({ fileURL }) => (
  <div className="pdf-viewer">
    <Document file={fileURL}>
      <Page pageNumber={1} width={800} />
    </Document>
  </div>
  
);

export default DocumentViewerPDF;
