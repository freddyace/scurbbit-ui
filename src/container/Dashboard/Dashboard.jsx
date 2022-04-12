import "./bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome.min.css";
import "./css/Navigation-Menu.css";
import "./css/Pricing-Table---EspacioBinariocom.css";
import "./css/styles.css";
import profilePic from "./img/img.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../../component/loader/Spinner.jsx";
import AppNavBar from "../../component/AppNavBar/AppNavBar.jsx";
const Dashboard = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [navBarStyles, setNavBarStyles] = useState("collapse navbar-collapse");
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      {/* <nav
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
      </nav> */}
      <section className="pricing py-5" style={{ background: "white" }}>
        <div className="container">
          <div className="row">
            <div className="col col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="text-uppercase text-center text-muted card-title">
                    Book NOW
                  </h5>
                  <h6 className="text-center card-subtitle mb-2 card-price">
                    Get Service Now
                  </h6>
                  <hr />
                  <ul className="fa-ul">
                    <li>
                      23 Scrubbers online in <b>30253</b>
                      <span className="fa-li">
                        <i
                          className="fa fa-check"
                          style={{ color: "rgb(116,248,35)" }}
                        ></i>
                      </span>
                    </li>
                  </ul>
                  <a
                    className="btn btn-success d-block w-100"
                    role="button"
                    style={{
                      color: "rgb(255,255,255)",
                      background: "linear-gradient(120deg, #00e4d0, #5983e8)",
                      border: "white",
                    }}
                    onClick={() => {
                      history.push('/getService')
                    }}
                  >
                    Order service now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="text-uppercase text-center text-muted card-title">
                    Need service later?
                  </h5>
                  <h6 className="text-center card-subtitle mb-2 card-price">
                    Schedule Service
                  </h6>
                  <hr />
                  <ul className="fa-ul">
                    <li>
                      Scrubbers in your area are offering scheduling
                      <span className="fa-li">
                        <i
                          className="fa fa-check"
                          style={{ color: "rgb(116,248,35)" }}
                        ></i>
                      </span>
                    </li>
                  </ul>
                  <a
                    className="btn btn-success d-block w-100"
                    role="button"
                    style={{
                      color: "rgb(255,255,255)",
                      background: "linear-gradient(120deg, #00e4d0, #5983e8)",
                      border: "white",
                    }}
                  >
                    Schedule Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
