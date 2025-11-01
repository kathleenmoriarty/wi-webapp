import React, { useMemo, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectWorkInstructions } from "../features/wis/wisSlice";
import "../styles/DocumentViewer.css";

const DocumentViewerPDF = React.lazy(() => import("./DocumentViewerPDF"));

const DocumentViewer = () => {
    const { wiId } = useParams();
    const list = useSelector(selectWorkInstructions);
    const navigate = useNavigate();

    const document = list.find((wi) => wi.id.toString() === wiId);
    if (!document) {
        return (
            <div className="document-viewer">
                <p>Document not found.</p>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        );
    }

    console.log("Loaded document:", document);
    console.log("File object:", document?.file);


    const file = document.file;
    const fileName = file?.name || "file";
    const fileURL = file?.url || null;

    if (!fileURL) {
        return (
            <div className="document-viewer">
                <h2>{document.title}</h2>
                <p>No file uploaded for this document.</p>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        );
    }

    const fileType = fileName.split(".").pop().toLowerCase();

    const renderPreview = useMemo(() => {
        if (fileType === "pdf") {
            return <DocumentViewerPDF fileURL={fileURL} />;
        }

        if (["jpg", "jpeg", "png"].includes(fileType)) {
            return <img src={fileURL} alt={document.title} width="80%" />;
        }

        if (["doc", "docx"].includes(fileType)) {
            return (
                <div>
                    <p>Preview not supported for Word documents.</p>
                    <a href={fileURL} download={fileName}>
                        Download {fileName}
                    </a>
                </div>
            );
        }

        return <p>Unsupported file type. Please download to view.</p>;
    }, [fileURL, fileType, document.title, fileName]);

    return (
        <div className="document-viewer">
            <header>
                <div className="title-info">
                    <button onClick={() => navigate(-1)}>Back</button>
                    <h2>{document.title}</h2>
                    <a href={fileURL} download={fileName}>
                        Download File
                    </a>
                </div>

                <div className="wis-info">
                    <p><span>Product:</span> {document.product}</p>
                    <p><span>Revision:</span> {document.revision}</p>
                    <p><span>Status:</span> {document.status}</p>
                </div>
            </header>

            <div className="preview-area">
                <Suspense fallback={<p>Loading preview...</p>}>
                    {renderPreview}
                </Suspense>
            </div>
        </div>
    );
};

export default DocumentViewer;

/*import React, { useState, useEffect, useMemo, Suspense }  from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectWorkInstructions } from "../features/wis/wisSlice";
import "../styles/DocumentViewer.css"

const DocumentViewerPDF = React.lazy(() => import("./DocumentViewerPDF"));

const DocumentViewer = () => {

    const { wiId } = useParams();
    const list = useSelector(selectWorkInstructions);
    const navigate = useNavigate();

    const document = list.find((wi) => wi.id.toString() === wiId);
    
    const [fileURL, setFileURL] = useState(null);

    const file = document?.file;
    const fileName = file?.name || "file";
    
    
    useEffect(() => {
        if(!file) return;

        if(typeof file === "string") {
            setFileURL(file);
            return;
        } else if(file instanceof File || file instanceof Blob) {
            const url = URL.createObjectURL(file);
            setFileURL(url);
            return () => URL.revokeObjectURL(url);
        } else {
            console.warn("Unsupported file type:", file);
        }
    }, [file]);  

    if(!document) {
        return (
            <div className="document-viewer">
                <p>Document not found.</p>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            
        )
    }

    if(!file) {
        return (
            <div className="document-viewer">
                <h2>{document.title}</h2>
                <p>No file uploaded for this document.</p>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        )
    }

    const fileType = fileName.split(".").pop().toLowerCase();

    const renderPreview = useMemo(() => {
        if(!fileURL) return <p>Loading preview...</p>;
        
        if(fileType === "pdf") {
            return <DocumentViewerPDF fileURL={fileURL} />;
        }

        if(["jpg", "jpeg", "png"].includes(fileType)) {
            return <img src={fileURL} alt={document.title} width="80%" />
        }

        if(["doc", "docx"].includes(fileType)) {
            return (
                <div>
                    <p>Preview not support for Word documents.</p>
                    <a href={fileURL} download={fileName}>
                        Download {fileName}
                    </a>
                </div>
            )
        }

        return <p>Unsupported file type. Please download to view.</p>
    }, [fileURL, fileType, document.title, fileName]);

    return (
        <div className="document-viewer">
            <header>
                <div className="title-info">
                    <button onClick={() => navigate(-1)}>Back</button>
                    <h2>{document.title}</h2>
                    <a href={fileURL} download={fileName}>
                        Download File
                    </a>
                </div>

                <div className="wis-info">
                    <p><span>Product:</span> {document.product}</p>
                    <p><span>Revision:</span> {document.revision}</p>
                    <p><span>Status:</span> {document.status}</p>
                </div>
            </header>
            
            <div className="preview-area">
                <Suspense fallback={<p>Loading preview...</p>}>
                    {renderPreview}
                </Suspense>
            </div>
        </div>
    );
};

export default DocumentViewer;*/


//add previous-next page features