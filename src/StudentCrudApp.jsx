import { useEffect, useState } from "react";
import AStudent from "./AStudent";
import axios from "axios";
import StudentDataForm from "./StudentDataForm";
import NavBarStudent from "./NavBarStudent";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function StudentCrudApp() {
  let url = "http://localhost:3000/students";
  let [flagLoader, setFlagLoader] = useState(false);
  let [studentList, setStudentList] = useState([]);
  let [filteredStudentList, setFilteredStudentList] = useState([]);
  let [selectedStudent, setSelectedStudent] = useState({});
  let [user, setUser] = useState(null);
  const [view, setView] = useState("home");
  const [message, setMessage] = useState("");
  // React HOOK --> useState
  useEffect(() => {
    // Called at the beginning... just during rendering of this component.
    // get data from backend server
    getDataFromServer();
  }, []);
  async function getDataFromServer() {
    setFlagLoader(true);
    let response = await axios(url);
    let list = response.data;
    setFlagLoader(false);
    console.log(list);
    setStudentList(list);
    setFilteredStudentList(list);
  }
  async function deleteFromServer(student) {
    setFlagLoader(true);
    let response = await axios.delete(url + "/" + student.id); // http://localhost:3000/students/4
    setFlagLoader(false);
  }
  function handleDeleteButtonClick(student) {
    if (!student) {
      showMessage("Delete operation cancelled");
      return;
    }
    // delete from backend
    deleteFromServer(student);

    // delete from studentList
    let list = studentList.filter((e, index) => e.id != student.id);
    setStudentList(list);
    setFilteredStudentList(list);
    showMessage("Delete operation successful");
  }
  function showMessage(m) {
    setMessage(m);
    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  function onAddStudentClick() {
    setView("add");
  }
  function handleEditButtonClick(student) {
    setView("edit");
    setSelectedStudent(student);
  }
  function onListButtonClick() {
    setView("list");
  }
  function handleFormSubmit(student) {
    if (view == "add") {
      // add this student to backend
      addDataToServer(student);
      // get its id from backend
      // Yes... s is the object received from backend
      // add this s to our list
    } else if (view == "edit") {
      updateDataInServer(student);
      // Now update in our list - studentList
      let list = studentList.map((e, index) => {
        if (student.id == e.id) {
          return student;
        } else {
          return e;
        }
      });
      setStudentList(list);
      setFilteredStudentList(list);
      setView("list");
      showMessage("Student updated  Successfully");
    }
  }
  async function updateDataInServer(student) {
    setFlagLoader(true);
    let response = await axios.put(url + "/" + student.id, student);
    setFlagLoader(false);
  }
  async function addDataToServer(student) {
    setFlagLoader(true);
    let response = await axios.post(url, student);
    let s = response.data; // this returned student object has id
    console.log(s);
    let list = [...studentList];
    list.push(s);
    setStudentList(list);
    setFilteredStudentList(list);
    // Add this s to our studentList
    setView("list");
    setFlagLoader(false);
    showMessage("Student added Successfully");
  }
  function handleSearchtextChange(event) {
    let text = event.target.value;
    let flist = studentList.filter((e, index) =>
      e.name.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredStudentList(flist);
  }
  function handleSignupBtnClick() {
    setView("signup");
  }
  function handleLoginBtnClick() {
    setView("login");
  }
  function handleLogoutBtnClick() {
    setUser(null);
    setView("home");
  }
  function handleLoginFormSubmit(user) {
    if (user) {
      setView("list");
      setUser(user);
    } else {
      showMessage("Wrong Credentials!");
    }
  }
  function handleSignupFormSubmit() {
    showMessage("Signup Successful...");
    setView("signupSuccess");
  }
  if (flagLoader) {
    return <div>Wait....</div>;
  }
  return (
    <>
      <NavBarStudent
        view={view}
        user={user}
        message={message}
        onSignupBtnClick={handleSignupBtnClick}
        onLoginBtnClick={handleLoginBtnClick}
        onLogoutBtnClick={handleLogoutBtnClick}
      />
      {view == "signupSuccess" && (
        <div className="text-danger my-5">
          Signup successful.. you may{" "}
          <a
            href="#"
            onClick={() => {
              setView("login");
            }}
          >
            login
          </a>{" "}
          now
        </div>
      )}{" "}
      {view == "home" && (
        <div className="my-5">
          <img src="/images/students.jpg" alt="" />
        </div>
      )}
      {view == "signup" && (
        <SignupForm onSignupFormSubmit={handleSignupFormSubmit} />
      )}
      {view == "login" && (
        <LoginForm onLoginFormSubmit={handleLoginFormSubmit} />
      )}
      {view == "list" && (
        <div className="my-3">
          <input
            type="text"
            name=""
            size="50"
            id=""
            placeholder="Search a student by name"
            onKeyUp={handleSearchtextChange}
          />{" "}
        </div>
      )}
      {view == "list" && (
        <div className="my-2">
          <button className="btn btn-primary" onClick={onAddStudentClick}>
            Add a Student
          </button>
        </div>
      )}
      {(view == "add" || view == "edit") && (
        <div className="my-2">
          <button className="btn btn-primary" onClick={onListButtonClick}>
            List
          </button>
        </div>
      )}
      {(view == "add" || view == "edit") && (
        <div className="container my-5">
          <StudentDataForm
            onFormSubmit={handleFormSubmit}
            view={view}
            selectedStudent={selectedStudent}
          />
        </div>
      )}
      {view == "list" && (
        <div className="container w-50 text-white">
          <div className="row my-1 text-primary p-2">
            <div className="col-2">Sr. No.</div>
            <div className="col-2">Rollno</div>
            <div className="col-4">Name</div>
            <div className="col-2">Marks</div>
          </div>
          {filteredStudentList.map((e, index) => (
            <AStudent
              student={e}
              key={index}
              index={index}
              onDeleteButtonClick={handleDeleteButtonClick}
              onEditButtonClick={handleEditButtonClick}
            />
          ))}
        </div>
      )}
    </>
  );
}
