import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // for showing details

  // Fetch all users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        alert("Error fetching users: " + error.message);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      alert("Error deleting user: " + error.message);
    } else {
      setUsers(users.filter((user) => user.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users Dashboard</h2>

      {/* Users List */}
      <div className="flex gap-8">
        <div className="w-1/2 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">All Users</h3>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-2 border-b hover:bg-gray-50 cursor-pointer"
              >
                <span onClick={() => setSelectedUser(user)}>{user.email}</span>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected User Details */}
        <div className="w-1/2 border p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">User Details</h3>
          {selectedUser ? (
            <div>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role || "user"}
              </p>
              <p>
                <strong>Created at:</strong>{" "}
                {new Date(selectedUser.created_at).toLocaleString()}
              </p>
            </div>
          ) : (
            <p>Select a user to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
