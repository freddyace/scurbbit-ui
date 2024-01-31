import React, { useState, useEffect } from "react";
import "./stylesheet.css";
import { useAuth } from "../../helpers/context/useAuth.jsx";
import { getDatabase, push, ref as dbRef, onValue } from "firebase/database";
import { useHistory } from "react-router-dom";

const MessageSent = (props) => {
  let history = useHistory();
  const db = getDatabase();
  const scrubbitAuth = useAuth();
  const [userFirstname, setUserFirstName] = useState(null);
  const [userLastname, setUserLastName] = useState(null);
  const [county, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const database = getDatabase();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const handleChange = (event) => {
    console.log(event.target.value);
  };
  const handleCountyChange = (event) => {
    console.log(event.target.value);
  };

  useEffect(() => {}, []);
  return (
    <div>
      <div>
        <p>
          Your message has been sent to the Scrubbit team. They will be
          responding to you via email. Please check the email address you used
          to register your scrubbit account. Thank you!
        </p>
        <button
          className="btn btn-primary d-block w-100"
          type="button"
          style={{
            border: "none",
            background: "linear-gradient(120deg, #00e4d0, #5983e8)",
          }}
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default MessageSent;
