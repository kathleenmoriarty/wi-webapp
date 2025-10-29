import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectWorkInstructions } from "../features/wis/wisSlice";
import { Document, Page } from "react-pdf";

const DocumentViewer = () => {

    const { wiId } = useParams();
    const { list } = useSelector(selectWorkInstructions);
    const navigate = useNavigate();

    const document = list.find((wi) => wi.id.toString() === wiId);

    if(!document) {
        return (
            <div className="document-viewer">
                <p>Document not found.</p>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            
        )
    }

    const file = document.file;

    if(!file) {
        return (
            <div className="document-viewer">
                <h2>{document.title}</h2>
                <p>No file uploaded for this document.</p>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        )
    }

    const fileURL = URL.createObjectURL.URL(file);
    const fileType = file.name.split(".").pop().toLowerCase();

    const renderPreview = () => {
        if(fileType === "pdf") {
            return (
                <Document file={fileURL}>
                    <Page pageNumber={1} width={800}/>
                </Document>
            )
        }

        if(["jpg", "jpeg", "png"].includes(fileType)) {
            return <img src={fileURL} alt={document.title} width="80%" />
        }

        if(["doc", "docx"].includes(fileType)) {
            return (
                <div>
                    <p>Preview not support for Word documents.</p>
                    <a href={fileURL} download={file.name}>
                        Download {file.name}
                    </a>
                </div>
            )
        }

        return <p>Unsupported file type. Please download to view.</p>
    }

    return (
        <div className="document-viewer">
            <header>
                <div>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <h2>{document.title}</h2>
                    <a href={fileURL} download={file.name}>
                        Download File
                    </a>
                </div>

                <div>
                    <p><span>Product:</span> {document.product}</p>
                    <p><span>Revision:</span> {document.revision}</p>
                    <p><span>Status:</span> {document.status}</p>
                </div>
            </header>
            

            <div className="preview-area">
                {renderPreview()}
            </div>
        </div>
    );
};

export default DocumentViewer;

//add previous-next page features