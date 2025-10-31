import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWIAsync, fetchWIs, selectLoading, selectError, selectWorkInstructions } from "./wisSlice";
import {selectSearchTerm, selectSearchType} from "../search/searchSlice"
import { useNavigate } from "react-router-dom";
import Searchbar from "../search/Searchbar";
import '../../styles/WIList.css'

const WIList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const workInstructions = useSelector(selectWorkInstructions);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const searchTerm = useSelector(selectSearchTerm);
    const searchType = useSelector(selectSearchType);

    useEffect(() => {
        dispatch(fetchWIs());
    }, [dispatch]);

    const filteredList = searchType === "wis"
        ? workInstructions.filter((wi) =>
            wi.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wi.product.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : workInstructions;

    if (loading) return <p>Loading work instructions...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="wi-list">
            <h2>Work Instructions List</h2>

            <Searchbar />
            
            {filteredList.length === 0 && <p>No Work Instructions found.</p>}

            {filteredList.map((wi) => (
                    <div key={wi.id}>
                        <p>{wi.title} | {wi.product} | {wi.revision} | {wi.status}</p>
                        <div className="btn-container">
                            <button onClick={() => navigate(`/view/${wi.id}`)}>View</button>
                            <button onClick={() => {
                                if(window.confirm("Are you sure you want to delete this WI?")) {
                                    dispatch(deleteWIAsync(wi.id))
                                }
                            }}>Remove</button>
                        </div>
                        
                    </div>
                )
            )}
            
        </div>
    );
};

export default WIList;


//add owner property when it is admin view
//add success/error feedback
//add search term function based on info from searchbar/searchterm state
//filter based on published/draft etc