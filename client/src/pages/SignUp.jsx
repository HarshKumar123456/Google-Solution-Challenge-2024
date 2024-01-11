import React from "react";
import Layout from "../components/Layout/Layout";

import "../assets/styles/pages/SignUp.css";

const SignUp = () => {

    const serverURL = import.meta.env.VITE_SERVER_URL;

    const handleClickOnGoogleButton = async () => {
        console.log("I got clivked");
        window.open(`${serverURL}/auth/google`, "_self");
    };

    return <>
        <Layout>

            <div className="container text-center my-4">
                <button type="button" className="login-with-google-btn" onClick={handleClickOnGoogleButton}>
                    Continue with Google
                </button>
            </div>

        </Layout>
    </>;
};

export default SignUp;