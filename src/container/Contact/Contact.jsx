import React from "react";
import "./stylesheet.css";
const Contact = () => {
  return (
    <div>
      <div className='contact'>
        <form>
          <p>
            Customers are the priority here at Scrubbit. If you need to contact
            us for any reason, please fill out the form below and a team member
            will reach out to you as soon as possible.
          </p>
          <label for="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
          />

          <label for="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
          />

          <label for="country">Country</label>
          <select id="State" name="country">
            <option value="Georgia">Georgia</option>
            <option value="canada">Florida</option>
            <option value="usa">Tenessee</option>
          </select>
          <select id="County" name="country">
            <option value="Fulton">Fulton</option>
            <option value="Clayton">Clayton</option>
            <option value="Henry">Henry</option>
          </select>
          <textarea>Some text...</textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
      {/* <textarea>Some text...</textarea> */}
    </div>
  );
};

export default Contact;
