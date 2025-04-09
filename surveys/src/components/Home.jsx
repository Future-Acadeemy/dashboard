import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://survey-backend.up.railway.app/api/auth/users"
        ); // Adjust API URL as needed
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Select a User
      </h1>

      {loading && <p className="text-lg text-gray-700">Loading users...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-100 transition"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-600">Phone: {user.phone}</p>
            <p className="text-gray-600">Age: {user.age}</p>
            <p className="text-gray-600">Gender: {user.gender}</p>
            <p className="text-gray-600">Job: {user.job}</p>
            <p
              className={`font-semibold ${
                user.isLoggedIn ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.isLoggedIn ? "Online" : "Offline"}
            </p>
            <button
              onClick={() => navigate(`/userSurvey/${user.phone}`)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
