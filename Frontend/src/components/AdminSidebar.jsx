import {
    FaTachometerAlt,
    FaCalendarAlt,
    FaPlusCircle,
    FaClipboardList,
    FaUsers,
    FaUserShield,
    FaSignOutAlt,
} from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

import "./AdminSidebar.css";
import logo from "../assets/logo1.png"; 

function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/");
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaTachometerAlt />,
        },
        {
            name: "Events",
            path: "/admin/events",
            icon: <FaCalendarAlt />,
        },
        {
            name: "Create Event",
            path: "/admin/create-event",
            icon: <FaPlusCircle />,
        },
        {
            name: "Registrations",
            path: "/admin/registrations",
            icon: <FaClipboardList />,
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: <FaUsers />,
        },
        {
            name: "Logout",
            path: "#",
            icon: <FaSignOutAlt />,
            logout: true,
        },
    ];

    return (
        <div className="adminSidebar">

            {/* Logo */}

            <div className="sidebarLogo">
                <img src={logo} alt="Logo" />
                <h2>Eventify</h2>
            </div>

            {/* Menu */}

            <div className="sidebarMenu">
                {menuItems.map((item) => {

                    if (item.logout) {
                        return (
                            <div
                                key={item.name}
                                className="menuItem logoutMenu"
                                onClick={handleLogout}
                            >
                                <span className="menuIcon">
                                    {item.icon}
                                </span>
                                <span>{item.name}</span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={
                                location.pathname === item.path
                                    ? "menuItem active"
                                    : "menuItem"
                            }
                        >
                            <span className="menuIcon">
                                {item.icon}
                            </span>

                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}

export default AdminSidebar;