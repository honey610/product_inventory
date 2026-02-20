import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import Snackbar from "../components/Snackbar";
import Loader from "../components/Loader";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/users");
      setUsers(res.data.users);
    } catch (error) {
      setSnackbar({ message: "Failed to load users", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, newRole) => {
    if (!window.confirm(`Change role to ${newRole}?`)) return;

    try {
      setLoading(true);

      await api.put(`/admin/users/${id}/role`, {
        role: newRole,
      });

      setSnackbar({
        message: "Role updated successfully",
        type: "success",
      });

      fetchUsers();
    } catch {
      setSnackbar({ message: "Failed to update role", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="ADMIN">
      <h2>Manage Users</h2>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role === "ADMIN" ? (
                  <button
                    className="danger"
                    onClick={() => changeRole(u._id, "USER")}
                  >
                    Make User
                  </button>
                ) : (
                  <button onClick={() => changeRole(u._id, "ADMIN")}>
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <Loader />}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </DashboardLayout>
  );
};

export default ManageUsers;