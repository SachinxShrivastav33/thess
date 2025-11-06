import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const GetTotoalUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/user/getUser",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64">
        <h1 className="text-3xl font-semibold mb-6">Total Users</h1>
        {users.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-500 text-sm">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetTotoalUser;
