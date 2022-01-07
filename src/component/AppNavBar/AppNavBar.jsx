import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import profilePic from "../../container/Dashboard/img/img.png"

const AppNavBar = () => {
  const [navBarStyles, setNavBarStyles] = useState("collapse navbar-collapse");
  const [showNavBar, setShowNavBar] = useState(false);
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <nav
      className="navbar navbar-light navbar-expand-md"
      style={{ background: "linear-gradient(120deg, #00e4d0, #5983e8)" }}
    >
      <div className="container-fluid">
        <div>
          <a className="navbar-brand d-none" href="#">
            {" "}
          </a>
        </div>
        <img
          style={{
            borderRadius: "50%",
            border: "1px black solid",
            display: "block",
            height: "50px",
            width: "50px",
          }}
          src={profilePic}
        />
        <h1 style={{ color: "white", margin: "auto" }}>Scrubbit</h1>
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-1"
          onClick={() => {
            console.log("clicking");
            if (!showNavBar) {
              setNavBarStyles("collapse navbar-collapse show");
              setShowNavBar(true);
            } else {
              setNavBarStyles("collapse navbar-collapse");
              setShowNavBar(false);
            }
          }}
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={navBarStyles} id="navcol-1">
          <ul className="navbar-nav main-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                id="home"
                style={{ color: "white" }}
                href="#"
              >
                Home{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "white" }}>
                About{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "white" }}>
                Contact{" "}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => {
                  history.push("/editProfile");
                }}
                style={{ color: "white" }}
              >
                Edit Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                style={{ color: "white" }}
                onClick={() => {
                  console.log("signing out...");
                  setIsLoading(true);
                  setTimeout(() => {
                    localStorage.removeItem("user");
                    history.push("/");
                  }, 3000);
                }}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavBar;
