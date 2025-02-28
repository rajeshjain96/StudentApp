import axios from "axios";
import { useState } from "react";

export default function LoginForm(props) {
  let [user, setUser] = useState({});
  function handletextChange(event) {
    let u = { ...user };
    u[event.target.name] = event.target.value;
    setUser(u);
  }
  async function addUsertoBackEnd() {
    let response = await axios.post("http://localhost:3000/users", user);
  }
  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log(user);
    // get users from backend
    let response = await axios("http://localhost:3000/users");
    let users = response.data;
    let flist = users.filter(
      (e, index) => e.emailid == user.emailid && e.password == user.password
    );
    console.log(flist.length);

    if (flist.length == 1) {
      props.onLoginFormSubmit(flist[0]);
    } else {
      //failure
      props.onLoginFormSubmit(null);
    }
  }
  return (
    <div className="mt-4">
      <form onSubmit={handleFormSubmit}>
        {/* row starts */}
        <div className="row w-75 mx-auto bg-primary p-3 text-white">
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
