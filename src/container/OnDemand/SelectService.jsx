import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../../component/loader/Spinner.jsx";
import "../Dashboard/bootstrap/css/bootstrap.min.css";
import "../Dashboard/fonts/font-awesome.min.css";
import "../Dashboard/css/Navigation-Menu.css";
import "../Dashboard/css/Pricing-Table---EspacioBinariocom.css";
import "../Dashboard/css/styles.css";
import "./styles.css";
import { useAuth } from "../../helpers/context/useAuth.jsx";
import img1 from "../About/assets/img/clean1.jpg";

const SelectService = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const scrubbitAuth = useAuth();
  const showLoader = () => {
    console.log("inside showLoader");
    return (
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          width: "50%",
          padding: "10px",
        }}
      >
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  });
  return isLoading ? (
    showLoader()
  ) : (
    <div>
      <section className="pricing py-5" style={{ background: "white" }}>
        <div className="container">
          <div className="row">
            <div className="col col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="text-uppercase text-center text-muted card-title">
                    Available Now
                  </h5>
                  <h6 className="text-center card-subtitle mb-2 card-price">
                    Full Service Package
                  </h6>
                  <hr />
                  <ul className="fa-ul">
                    {/* <li>
                      <img className="card-image" src={img1} />
                    </li> */}
                    {/* <li>
                      <b>4.2/5</b>
                      <span className="fa-li">
                        <i className="fa fa-star" style={{ color: "gold" }}></i>
                      </span>
                    </li> */}
                    <li>
                      <ul>
                        <li>
                          <h4>Interior</h4>
                          <ul>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Vacuum Interior
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Cupholders
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Dashboard
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Steering Wheel
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Trash Collection
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Seats Service
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Windows
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Deodorize
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <h4>Exterior</h4>
                          <ul>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Body
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Rims
                            </li>{" "}
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Windows
                            </li>{" "}
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Lights
                            </li>{" "}
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Wax Finish
                            </li>
                          </ul>
                        </li>
                      </ul>
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
                      history.push("/createFullServiceOrder");
                    }}
                  >
                    Start Order
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="text-uppercase text-center text-muted card-title">
                    Available Now
                  </h5>
                  <h6 className="text-center card-subtitle mb-2 card-price">
                    Full Service Package
                  </h6>
                  <hr />
                  <ul className="fa-ul">
                    {/* <li>
                      <img className="card-image" src={img1} />
                    </li> */}
                    {/* <li>
                      <b>4.2/5</b>
                      <span className="fa-li">
                        <i className="fa fa-star" style={{ color: "gold" }}></i>
                      </span>
                    </li> */}
                    <li>
                      <ul>
                        <li>
                          <h4>Exterior</h4>
                          <ul>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Body
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Rims
                            </li>{" "}
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Windows
                            </li>{" "}
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Lights
                            </li>{" "}
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Wax Finish
                            </li>
                          </ul>
                        </li>
                      </ul>
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
                      history.push("/createExteriorServiceOrder");
                    }}
                  >
                    Start Order
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-lg-4">
              <div className="card mb-5 mb-lg-0">
                <div className="card-body">
                  <h5 className="text-uppercase text-center text-muted card-title">
                    Available Now
                  </h5>
                  <h6 className="text-center card-subtitle mb-2 card-price">
                    Full Service Package
                  </h6>
                  <hr />
                  <ul className="fa-ul">
                    {/* <li>
                      <img className="card-image" src={img1} />
                    </li> */}
                    {/* <li>
                      <b>4.2/5</b>
                      <span className="fa-li">
                        <i className="fa fa-star" style={{ color: "gold" }}></i>
                      </span>
                    </li> */}
                    <li>
                      <ul>
                        <li>
                          <h4>Interior</h4>
                          <ul>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Vacuum Interior
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Cupholders
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Dashboard
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Steering Wheel
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Trash Collection
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Seats Service
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Windows
                            </li>
                            <li>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="green"
                                class="bi bi-check"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                              </svg>
                              Deodorize
                            </li>
                          </ul>
                        </li>
                      </ul>
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
                      history.push("/createInteriorServiceOrder");
                    }}
                  >
                    Start Order
                  </a>
                </div>
              </div>
            </div>
          </div>
          <a
            className="btn btn-success d-block w-100"
            role="button"
            style={{
              color: "rgb(255,255,255)",
              background: "linear-gradient(120deg, #00e4d0, #5983e8)",
              border: "white",
            }}
            onClick={() => {
              history.push("/");
            }}
          >
            Cancel
          </a>{" "}
        </div>
      </section>
    </div>
  );
};

export default SelectService;
