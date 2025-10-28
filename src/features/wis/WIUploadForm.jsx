import React, {useCallback, useState} from "react";
import { useDispatch } from "react-redux";
import { saveWIDraft, publishWI } from "./wisSlice";

const WIUploadForm = () => {

    const dispatch = useDispatch();

    const initialState = {
        title: "",
        product: "",
        revision: "",
        effectiveDate: "",
        file: null
    };

    const [status, setStatus] = useState("idle");
    const [formData, setFormData] = useState(initialState);


    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }, []);

    const handleSubmit = async (type) => {
        setStatus("loading");

        try {
            await new Promise ((resolve) => setTimeout(resolve, 2000));
            const payload = 
                type === "draft"
                    ? {...formData, id: Date.now()}
                    : {...formData, id: crypto.randomUUID()};
            
                    console.log(`${type === "draft" ? "Draft saved" : "Form Published"}:`, payload)
            
            type === "draft"
                ? dispatch(saveWIDraft(payload))
                : dispatch(publishWI(payload));

            setStatus("success");
            setFormData(initialState)
        } catch (err) {
            console.error(err);
            setStatus("error");
        } finally {
            setTimeout(() => setStatus("idle"), 2000);
        }
    };

    return (
        <div className="upload-form">
            <h1>Upload New Work Instruction</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("publish")
            }}>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={formData.title} 
                    onChange={handleChange}
                    required 
                />

                <label htmlFor="product">Product</label>
                <input 
                    type="text" 
                    name="product" 
                    id="product"
                    value={formData.product} 
                    onChange={handleChange}
                    required
                />

                <label htmlFor="revision">Revision</label>
                <input 
                    type="text" 
                    name="revision" 
                    id="revision" 
                    value={formData.revision} 
                    onChange={handleChange}
                />

                <label htmlFor="effectiveDate">Effective Date</label>
                <input 
                    type="date" 
                    name="effectiveDate" 
                    id="effectiveDate" 
                    value={formData.effectiveDate} 
                    onChange={handleChange}
                />

                <label htmlFor="file">File Upload</label>
                <input 
                    type="file" 
                    name="file" 
                    id="file" 
                    accept=".pdf, .docx, .jpg, .jpeg, .png" 
                    onChange={handleChange}
                />

                <div className="button-group">
                    <button type="button" onClick={() => handleSubmit("draft")} disabled={status === "loading"}>
                        Save Draft
                    </button>
                    <button type="submit" disabled={status === "loading"}>Submit</button>
                </div>

                {status === "loading" && <p>Loading...</p>}
                {status === "success" && <p>Success!</p>}
                {status === "error" && <p>Error saving form</p>}

            </form>
        </div>
    );
};

export default WIUploadForm;