import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const EmailVerification = (props) => {
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let history = useHistory();
  const EmailVerificationPage = () => {
    return (
      <div className="container full-height">
        <section className="login-clean">
          <form>
            <h1 style={{ color: "gray", textAlign: "center" }}>Scrubbit</h1>
            <h6 style={{ color: "gray", textAlign: "center" }}>Mobile Wash</h6>
            <div className="illustration">
              <i className="icon ion-waterdrop"></i>
            </div>
            <p
              style={{
                color: "gray",
                textAlign: "center",
                fontSize: "15px",
                paddingTop: "20px",
                marginBottom: "-20px",
              }}
            >
              Thanks for signing up! A verfication email has been sent to:
              ${props.email}. Once verification is complete, you will be able to log in.
            </p>{" "}
            <br></br>
            <br></br>
            <div className="mb-3">
              <button
                className="btn btn-primary d-block w-100"
                type="button"
                onClick={() => history.push("/")}
              >
                Got it!
              </button>
            </div>
            {/* <a className="forgot" onClick={() => console.log("test")}>
              Need Help?
            </a> */}
            <p
              style={{
                color: "gray",
                textAlign: "center",
                fontSize: "10px",
                paddingTop: "20px",
                marginBottom: "-20px",
              }}
            >
              © 2020 - 2022 Scrubbit Car Wash LLC
            </p>
          </form>
        </section>
      </div>
    );
  };

  return <EmailVerificationPage />;
};
export default EmailVerification;
