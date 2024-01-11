import React from "react";
import "../../assets/styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return <>

        <div className="container">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link px-2 text-body-secondary">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/about-us"} className="nav-link px-2 text-body-secondary">
                            About Us
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/faqs"} className="nav-link px-2 text-body-secondary">
                            FAQs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/contact-us"} className="nav-link px-2 text-body-secondary">
                            Contact Us
                        </Link>
                    </li>
                </ul>
                <p className="text-center text-body-secondary">© {new Date().getFullYear()} Company, Inc</p>
            </footer>
        </div>

    </>
};

export default Footer;

