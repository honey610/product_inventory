import { NavLink } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <h2>{role === "ADMIN" ? "Admin Panel" : "User Panel"}</h2>

      <NavLink to="/dashboard">Dashboard</NavLink>

      {role === "ADMIN" && (
        <>
          <NavLink to="/admin/dashboard">Manage Products</NavLink>
          <NavLink to="/admin/users">Manage Users</NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;