export default function AStudent(props) {
  let { student } = props;
  let { index } = props;
  function handleDeleteButtonClick() {
    let ans = window.confirm(
      "Do you really want to remove record of " + student.name
    );
    if (ans) {
      props.onDeleteButtonClick(student);
    } else {
      props.onDeleteButtonClick(null);
    }
  }
  function handleEditButtonClick() {
    props.onEditButtonClick(student);
  }
  return (
    <div className="row my-1 bg-primary p-2">
      <div className="col-2">{index + 1}.</div>
      <div className="col-2">{student.rollno}</div>
      <div className="col-4">{student.name}</div>
      <div className="col-2">{student.marks}</div>
      <div className="col-1">
        <button className="btn btn-danger" onClick={handleEditButtonClick}>
          {" "}
          <i class="bi bi-pencil-square"></i>
        </button>
      </div>
      <div className="col-1">
        {" "}
        <button className="btn btn-danger" onClick={handleDeleteButtonClick}>
          {" "}
          <i class="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
}
