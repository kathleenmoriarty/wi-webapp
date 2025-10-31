import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, selectSearchType, setSearchTerm, setSearchType } from "./searchSlice";
import '../../styles/Searchbar.css'

const Searchbar = () => {

    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const searchType = useSelector(selectSearchType);

    const handleTermChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleTypeChange = (e) =>{
        dispatch(setSearchType(e.target.value));
    }
    
    return (
        <div className="searchbar">
            <select value={searchType} onChange={handleTypeChange}>
                <option value="wis">Work Instructions</option>
                <option value="users">Users</option>
            </select>
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={handleTermChange}
            />
        </div>
    );
};

export default Searchbar;