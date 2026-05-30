import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {

  return (

    <div className="dashboardLayout">

      <AdminSidebar />

      <div className="dashboardContent">

        {children}

      </div>

    </div>

  );
}

export default AdminLayout;