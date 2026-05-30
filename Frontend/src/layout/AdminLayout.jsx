import AdminSidebar from "../components/AdminSidebar";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="adminLayout">

      <AdminSidebar />

      <div className="adminMain">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;