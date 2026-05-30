import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      // Uncomment when backend is ready

      // const response = await fetch(
      //   "http://localhost:5000/api/users"
      // );

      // const data = await response.json();

      // setUsers(data.data);

      setUsers([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      // Uncomment when backend is ready

      // await fetch(
      //   `http://localhost:5000/api/users/${id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );

      setUsers(
        users.filter(
          (user) => user._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (user) => user.role === "Admin"
  ).length;

  const totalMembers = users.filter(
    (user) => user.role === "User"
  ).length;

  return (
    <AdminLayout>
      <div className="usersPage">
        <div className="usersHeader">
          <div>
            <h1>Users Management</h1>
            <p>
              Manage all platform users
            </p>
          </div>

          <Link to="/admin/add-user">
            <button className="addUserBtn">
              + Add User
            </button>
          </Link>
        </div>

        {/* STATS */}

        <div className="userStats">
          <div className="statCard">
            <h3>{totalUsers}</h3>
            <p>Total Users</p>
          </div>

          <div className="statCard">
            <h3>{totalAdmins}</h3>
            <p>Admins</p>
          </div>

          <div className="statCard">
            <h3>{totalMembers}</h3>
            <p>Members</p>
          </div>
        </div>

        {/* SEARCH */}

        <div className="userSearch">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* TABLE */}

        <div className="usersTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Events Joined</th>
                <th>Joined On</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`roleBadge ${user.role.toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      {user.eventsJoined || 0}
                    </td>

                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <div className="userActions">
                        <Link
                          to={`/admin/edit-user/${user._id}`}
                        >
                          <button className="editBtn">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="deleteBtn"
                          onClick={() =>
                            handleDelete(
                              user._id
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Users;