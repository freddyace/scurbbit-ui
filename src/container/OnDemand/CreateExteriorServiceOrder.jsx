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
const CreateExteriorServiceOrder = () => {
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
        <p>Loading</p>
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
                    Available NOW
                  </h5>
                  <h6 className="text-center card-subtitle mb-2 card-price">
                    Josh Harman
                  </h6>
                  <hr />
                  <ul className="fa-ul">
                    <li>
                      <img className="card-image" src={img1} />
                    </li>
                    <li>
                      <b>4.2/5</b>
                      <span className="fa-li">
                        <i className="fa fa-star" style={{ color: "gold" }}></i>
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
                      history.push("/selectService");
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

export default CreateExteriorServiceOrder;
