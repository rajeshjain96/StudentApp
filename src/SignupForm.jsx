import axios from "axios";
import { useState } from "react";

export default function SignupForm(props) {
  let [user, setUser] = useState({});
  function handletextChange(event) {
    let u = { ...user };
    u[event.target.name] = event.target.value;
    setUser(u);
  }
  async function addUsertoBackEnd() {
    let response = await axios.post("http://localhost:3000/users", user);
  }
  function handleFormSubmit(event) {
    // add user at the backend
    event.preventDefault();
    console.log(user);
    addUsertoBackEnd();
    props.onSignupFormSubmit();
  }
  return (
    <div className="mt-4">
      <form onSubmit={handleFormSubmit}>
        {/* row starts */}
        <div className="row w-75 mx-auto bg-primary p-3 text-white">
          <div className="col-6 text-end my-2">Enter user-name:</div>
          <div className="col-6 text-start my-2">
            <input
              type="text"
              name="username"
              value={user.username}
              id=""
              onChange={handletextChange}
              required
            />
          </div>
          <div className="col-6 text-end my-2">Enter email-id:</div>
          <div className="col-6 text-start my-2">
            <input
              type="email"
              name="emailid"
              value={user.emailid}
              id=""
              onChange={handletextChange}
              required
            />
          </div>
          <div className="col-6 text-end my-2">Enter password:</div>
          <div className="col-6 text-start my-2">
            <input
              type="password"
              name="password"
              id=""
              value={user.password}
              onChange={handletextChange}
            />
          </div>
          <div className="offset-6 col-6 text-start">
            <button className="btn btn-secondary mx-1">OK</button>
            <button className="btn btn-secondary">Cancel</button>
          </div>
        </div>
        {/* row ends */}
      </form>
    </div>
  );
}
