import React from "react";
import "../../assets/styles/Header.css";

const Header = () => {
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
                                    <a className="nav-link active" aria-current="page" href="#">
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">
                                        About Us
                                    </a>
                                </li>
                                
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