import React, { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./stylesheet.css";
const Contact = () => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [county, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const database = getDatabase();

  const handleChange = (event) => {
    console.log(event.target.value);
  };
  const handleCountyChange = (event) => {
    setFirstname(event.target.value);
  };
  const handleStateChange = (event) => {
    console.log(event.target.value);
  };
  const handleFirstNameChange = (event) => {};
  const handleLastNameChange = (event) => {
    console.log(event.target.value);
  };
  useEffect(() => {}, [firstname, lastname]);
  return (
    <div>
      <div className="contact">
        <p>
          Customers are the priority here at Scrubbit. If you need to contact us
          for any reason, please fill out the form below and a team member will
          reach out to you as soon as possible.
        </p>
        <label for="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="First name.."
          onChange={setFirstname}
        />

        <label for="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="lastname"
          placeholder="Last name.."
          fd
          c
        />

        <label for="state">State</label>
        <select id="State" name="state">
          <option value="Georgia">Georgia</option>
          <option value="canada">Florida</option>
          <option value="usa">Tenessee</option>
        </select>
        <label for="county">County</label>
        <select id="County" name="country" onChange={handleChange}>
          <option value="Fulton">Fulton</option>
          <option value="Clayton">Clayton</option>
          <option value="Henry">Henry</option>
        </select>
        <label for="message">Message</label>
        <textarea id="message">Some text...</textarea>

        <button
          onClick={() => {
            const obj = { name: "John", age: 21 };
            // const obj2 = {firstname: }
            console.log(JSON.stringify(obj));
            const db = getDatabase();
            set(ref(db, "users"), obj);
          }}
        />
      </div>
    </div>
  );
};

export default Contact;
