import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, selectUsers } from "./usersSlice";

const UserTable = () => {

    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    
    const addUserHandler = () => {
        const mockNewUser = {
            id: Date.now(),
            name: "New User",
            email: "user@example.com",
            role: "Viewer",
            status: "Active",
        };
        
        dispatch(addUser(mockNewUser));
    };
    
    const removeUserHandler = (id) => {
        dispatch(removeUser({ id }));
    };
    
    return (
        <div className="user-table">
            <h2>User Management</h2>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li className="user" key={user.id}>
                            <p>
                                {user.name} | {user.email} | {user.role} | {user.status} 
                            </p>
                            <button onClick={() => removeUserHandler(user.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            
            <button onClick={addUserHandler}>Add User</button>
        </div>
    );
};

export default UserTable;