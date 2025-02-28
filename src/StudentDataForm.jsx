import { useEffect, useState } from "react";

export default function StudentDataForm(props) {
  let { view } = props;
  let emptyStudent = { rollno: "", name: "", marks: "" };
  let [student, setStudent] = useState("");
  function handleFormSubmit(event) {
    event.preventDefault(); // stop page-refresh
    console.log(student);
    props.onFormSubmit(student);
  }
  useEffect(() => {
    if (view == "add") {
      setStudent(emptyStudent);
    } else if (view == "edit") {
      setStudent(props.selectedStudent);
    }
  }, []);
  function handletextChange(event) {
    // console.log(event.target.name + "..." + event.target.value);
    let s = { ...student };
    s[event.target.name] = event.target.value; // s["rollno"]=10
    setStudent(s);
  }
  return (
    <form onSubmit={handleFormSubmit}>
      {/* row starts */}
      <div className="row w-75 mx-auto bg-primary p-3 text-white">
        <div className="col-6 text-end my-2">Enter Rollno:</div>
        <div className="col-6 text-start my-2">
          <input
            type="text"
            name="rollno"
            value={student.rollno}
            id=""
            onChange={handletextChange}
          />
        </div>
        <div className="col-6 text-end my-2">Enter Name:</div>
        <div className="col-6 text-start my-2">
          <input
            type="text"
            name="name"
            value={student.name}
            id=""
            onChange={handletextChange}
          />
        </div>
        <div className="col-6 text-end my-2">Enter marks:</div>
        <div className="col-6 text-start my-2">
          <input
            type="text"
            name="marks"
            id=""
            value={student.marks}
            onChange={handletextChange}
          />
        </div>
        <div className="offset-6 col-6 text-start">
          <button className="btn btn-secondary mx-1">
            {view == "add" ? "Add" : "Modify"}
          </button>
          <button className="btn btn-secondary">Cancel</button>
        </div>
      </div>
      {/* row ends */}
    </form>
  );
}
