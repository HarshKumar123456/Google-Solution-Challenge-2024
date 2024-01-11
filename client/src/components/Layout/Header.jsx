import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../assets/styles/Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const [isRegistered, setIsRegistered] = useState(false);

    const serverURL = import.meta.env.VITE_SERVER_URL;
    console.log(serverURL);

    const checkIfRegistered = async () => {
        console.log("Checkif registered called\n");
        try {
            const response = await axios.get(`${serverURL}/access`, { withCredentials: true });
            if (response?.data?.success) {
                setIsRegistered(true);
            }
            else {
                setIsRegistered(false);
                console.log("Changed registered status to false");

            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfRegistered();
        if (isRegistered) {
            alert("Congratulations!! You are Registered....");
        }
    }, [isRegistered]);

    return <>
        <>
            <nav
                className="navbar navbar-expand-lg navbar"
                aria-label="Offcanvas navbar large"
            >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Life Under Water
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar2"
                        aria-controls="offcanvasNavbar2"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="offcanvas offcanvas-end text-bg-dark"
                        tabIndex={-1}
                        id="offcanvasNavbar2"
                        aria-labelledby="offcanvasNavbar2Label"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
                                Life Under Water
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link to={"/"} className="nav-link active" aria-current="page">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/about-us"} className="nav-link active" aria-current="page">
                                        About Us
                                    </Link>
                                </li>

                                {isRegistered ?
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                User
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >

                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        My Profile
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        Dashboard
                                                    </a>
                                                </li>

                                                <li>
                                                    <hr className="dropdown-divider" />
                                                </li>

                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        Log Out
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </> :
                                    <>
                                        <li className="nav-item">
                                            <Link to={"/sign-up"} className="nav-link">
                                                Sign Up
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/sign-in"} className="nav-link">
                                                Sign In
                                            </Link>
                                        </li>
                                    </>
                                }
                            </ul>
                            <form className="d-flex mt-3 mt-lg-0" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <button className="btn btn-outline-success" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

        </>

    </>;
};

export default Header;