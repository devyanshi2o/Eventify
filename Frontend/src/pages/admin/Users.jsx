import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import API from "../../api/axios";

import {
    FaUsers,
    FaSearch,
    FaEye,
    FaTrash
} from "react-icons/fa";

import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await API.get("/users");

            console.log("Users API Response:", response.data);

            setUsers(response.data.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Remove admin users
    const nonAdminUsers = users.filter(
        (user) => user.role !== "admin"
    );

    // Search users
    const filteredUsers = nonAdminUsers.filter(
        (user) =>
            (user.username || "")
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    //View User
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    //Delete User
    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/users/${id}`);

            setUsers(
                users.filter((user) => user._id !== id)
            );

            alert("User deleted successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to delete user");
        }
    };

    return (
        <AdminLayout>
            <div className="usersPage">

                {/* Header */}

                <div className="pageHeader">
                    <h1>Users</h1>
                    <p>Manage all registered users</p>
                </div>

                {/* Stats */}

                <div className="statsGrid">
                    <div className="statCard">

                        <FaUsers className="statIcon" />

                        <div>
                            <h2>{nonAdminUsers.length}</h2>
                            <p>Total Users</p>
                        </div>

                    </div>
                </div>

                {/* Search */}

                <div className="searchContainer">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search user..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                {/* Users Table */}

                <div className="tableContainer">

                    <table>

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Enrollment No</th>
                                <th>Email</th>
                                <th>College</th>
                                <th>Branch</th>
                                <th>Semester</th>
                                <th>Events</th>
                                {/* <th>Status</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td colSpan="5">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5">
                                        No Users Found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>

                                        <td>
                                            {user.enrollmentNo || "-"}
                                        </td>

                                        <td>
                                            {user.collegeName || "-"}
                                        </td>

                                        <td>
                                            {user.branch || "-"}
                                        </td>

                                        <td>
                                            {user.semester || "-"}
                                        </td>

                                        <td>{user.email}</td>

                                        <td>
                                            {user.eventsParticipated || 0}
                                        </td>

                                        {/* <td>
                                            <span className="activeBadge">
                                                Active
                                            </span>
                                        </td> */}

                                        <td>
                                            <div className="actionButtons">

                                                <button
                                                    className="actionBtn"
                                                    onClick={() =>
                                                        handleViewUser(user)
                                                    }
                                                >
                                                    <FaEye />
                                                </button>

                                                <button
                                                    className="deleteBtn"
                                                    onClick={() =>
                                                        handleDeleteUser(user._id)
                                                    }
                                                >
                                                    <FaTrash />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>

                    {
                        showModal && selectedUser && (
                            <div
                                className="modalOverlay"
                                onClick={() => setShowModal(false)}
                            >
                                <div
                                    className="userModal"
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                >
                                    <h2>User Details</h2>

                                    <div className="userInfo">

                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {selectedUser.username}
                                        </p>

                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {selectedUser.email}
                                        </p>

                                        <p>
                                            <strong>Enrollment:</strong>{" "}
                                            {selectedUser.enrollmentNo || "-"}
                                        </p>

                                        <p>
                                            <strong>College:</strong>{" "}
                                            {selectedUser.college || "-"}
                                        </p>

                                        <p>
                                            <strong>Branch:</strong>{" "}
                                            {selectedUser.branch || "-"}
                                        </p>

                                        <p>
                                            <strong>Events:</strong>{" "}
                                            {selectedUser.eventsCount || 0}
                                        </p>

                                    </div>

                                    <button
                                        className="closeBtn"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        )
                    }

                </div>

            </div>
        </AdminLayout>
    );
}

export default Users;