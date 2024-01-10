import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import "../../assets/styles/Layout.css";

const Layout = (props) => {
    return (
        <>
            <Header />
            <div className="container border layout-container">
                <h1>This is the beggininng of layout</h1>
                {props.children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;