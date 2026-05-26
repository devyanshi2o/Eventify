import { useEffect, useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import "./AdminDashboard.css";
import "./Registrations.css";

function Registrations() {

    const navigate =
        useNavigate();

    const [registrations,
        setRegistrations] =
        useState([]);


    // FETCH REGISTRATIONS

    const fetchRegistrations =
        async () => {

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/events/registrations"
                    );

                const data =
                    await response.json();

                console.log(
                    "API Response:",
                    data
                );

                setRegistrations(
                    data.data ||
                    data ||
                    []
                );

            } catch (error) {

                console.log(
                    error
                );

                setRegistrations(
                    []
                );

            }

        };


    useEffect(() => {

        fetchRegistrations();

    }, []);


    // LOGOUT

    const handleLogout = () => {

        // Remove admin login only

        localStorage.removeItem(
            "adminToken"
        );

        // Redirect to home page

        navigate(
            "/"
        );

    };


    return (

        <div className="dashboardLayout">

            {/* SIDEBAR */}

            <div className="sidebar">

                <h2 className="logo">

                    Eventify

                </h2>


                <ul className="sidebarMenu">

                    <li>

                        <Link
                            to="/admin/dashboard"
                        >

                            Dashboard

                        </Link>

                    </li>


                    <li>

                        <Link
                            to="/admin/events"
                        >

                            Events

                        </Link>

                    </li>


                    <li>

                        <Link
                            to="/admin/add-event"
                        >

                            Create Event

                        </Link>

                    </li>


                    <li
                        className="active"
                    >

                        <Link
                            to="/admin/registrations"
                        >

                            Registrations

                        </Link>

                    </li>


                    <li
                        onClick={
                            handleLogout
                        }
                    >

                        Logout

                    </li>

                </ul>

            </div>


            {/* CONTENT */}

            <div className="dashboardContent">

                <h1>

                    Event Registrations

                </h1>


                <div
                    className=
                    "registrationTable"
                >

                    <table>

                        <thead>

                            <tr>

                                <th>

                                    Student Name

                                </th>

                                <th>

                                    Email

                                </th>

                                <th>

                                    Event

                                </th>

                                <th>

                                    Date

                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {

                                registrations.length >

                                    0 ?

                                    registrations.map(
                                        (item) => (
                                            <tr
                                                key={
                                                    item._id
                                                }
                                            >

                                                <td>

                                                    {

                                                        item.userName ||

                                                        item.name ||

                                                        item.user?.name ||

                                                        "N/A"

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.email ||

                                                        item.user?.email ||

                                                        "N/A"

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.eventTitle ||

                                                        item.event?.title ||

                                                        "N/A"

                                                    }

                                                </td>


                                                <td>

                                                    {

                                                        item.createdAt ?

                                                            new Date(
                                                                item.createdAt
                                                            )

                                                                .toLocaleDateString()

                                                            :

                                                            "N/A"

                                                    }

                                                </td>

                                            </tr>

                                        ))

                                    :

                                    <tr>

                                        <td
                                            colSpan="4"
                                        >

                                            No registrations found

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Registrations;