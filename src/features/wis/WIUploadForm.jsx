import React, {useCallback, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDraftAsync, publishWIAsync, selectLoading, selectError } from "./wisSlice";

const WIUploadForm = () => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [success, setSuccess] = useState(false);

    const initialState = {
        title: "",
        product: "",
        revision: "",
        effectiveDate: "",
        file: null
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }, []);

    const handleSubmit = useCallback(
        async (type) => {
        
            const payload = {
                ...formData,
                id: type === "draft" ? Date.now() : crypto.randomUUID()
            };

            try {
                if(type === "draft") {
                    await dispatch(saveDraftAsync(payload)).unwrap();
                } else {
                    await dispatch(publishWIAsync(payload)).unwrap();
                }

                setFormData(initialState);
                setSuccess(true);
            } catch (err) {
                console.error("Error saving:", err);
                setSuccess(false);
            }
        },
        [dispatch, formData]
    );

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000); // hide after 3 seconds
            return () => clearTimeout(timer); // cleanup if component unmounts
        }
    }, [success]);    

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
                    <button type="button" onClick={() => handleSubmit("draft")} disabled={loading}>
                        Save Draft
                    </button>
                    <button type="submit" disabled={loading}>Submit</button>
                </div>

                {loading && <p>Loading...</p>}
                {success && !loading && <p>Success!</p>}
                {error && <p>Error saving form: {error}</p>}

            </form>
        </div>
    );
};

export default WIUploadForm;