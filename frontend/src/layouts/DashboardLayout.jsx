import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const DashboardLayout = ({ children, role }) => {
  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;