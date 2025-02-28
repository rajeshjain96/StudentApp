import { useState } from "react";

export default function NavBarStudent(props) {
  let { view } = props;
  let { user } = props;
  let { message } = props;
  function handleSignupBtnClick() {
    props.onSignupBtnClick();
  }
  function handleLoginBtnClick() {
    props.onLoginBtnClick();
  }
  function handleLogoutBtnClick() {
    props.onLogoutBtnClick();
  }
  return (
    <>
      <div className=" bg-primary p-2">
        <div>
          {!user && (
            <button
              className="btn btn-secondary mx-1"
              onClick={handleLoginBtnClick}
            >
              Login
            </button>
          )}
          {!user && (
            <button
              className="btn btn-secondary mx-1"
              onClick={handleSignupBtnClick}
            >
              Signup
            </button>
          )}
          {user && (
            <span className="text-white p-1">
              Welcome {user.username} {"  "}
            </span>
          )}
          {user && (
            <button
              className="btn btn-secondary mx-1"
              onClick={handleLogoutBtnClick}
            >
              Logout
            </button>
          )}
        </div>
        {message && <div className="text-danger bg-white my-2">{message}</div>}
      </div>
    </>
  );
}
