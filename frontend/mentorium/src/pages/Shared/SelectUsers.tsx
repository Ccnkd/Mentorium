import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect, useState } from 'react';

type SelectUsersProps = {
    selectedUsers: string[];
    setSelectedUsers: (ids: string[]) => void;
};

export const SelectUsers: React.FC<SelectUsersProps> = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState<string[]>([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0) {
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const toggleUserSelection = (userId: string) => {
        setTempSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        } else {
            setTempSelectedUsers([...selectedUsers]);
        }
    }, [selectedUsers]);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Assign Users</button>

            {isModalOpen && (
                <div className="modal">
                    <h3>Select Users</h3>
                    <ul>
                        {allUsers.map((user) => (
                            <li key={user.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={tempSelectedUsers.includes(user.id)}
                                        onChange={() => toggleUserSelection(user.id)}
                                    />
                                    {user.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAssign}>Assign</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};
