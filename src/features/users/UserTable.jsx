import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAsync, removeUserAsync, fetchUsers, selectUsers, selectUsersLoading, selectUsersError } from "./usersSlice";
import { selectSearchTerm, selectSearchType } from "../search/searchSlice";
import Searchbar from "../search/Searchbar";
import "../../styles/UserTable.css"

const UserTable = () => {

    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);
    const searchTerm = useSelector(selectSearchTerm);
    const searchType = useSelector(selectSearchType);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filteredUsers = searchType === "users"
        ? users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : users;
    
    const addUserHandler = () => {
        const mockNewUser = {
            id: crypto.randomUUID(),
            name: "New User",
            email: "user@example.com",
            role: "Viewer",
            status: "Active",
        };
        
        dispatch(addUserAsync(mockNewUser));
    };
    
    const removeUserHandler = (id) => {
        if (window.confirm("Are you sure you want to remove this user?")) {
            dispatch(removeUserAsync(id));
        }
    };

    if(loading) return <p>Loading users...</p>;
    if(error) return <p>Error: {error}</p>
    
    return (
        <div className="user-table">
            <h2>User Management</h2>

            <Searchbar />

            {filteredUsers.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {filteredUsers.map((user) => (
                        <li className="user" key={user.id}>
                            <p>
                                {user.name} | {user.email} | {user.role} | {user.status} 
                            </p>
                            <button onClick={() => removeUserHandler(user.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            
            <button onClick={addUserHandler} disabled={loading}>Add User</button>
        </div>
    );
};

export default UserTable;

//addUserHandler - create small pop up form to add new user
