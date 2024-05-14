import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

const Tasks = () => {
  //CREATE TASK
  const [formData, setFormData] = useState({
    projectName: "",
    taskCategory: "",
    taskImages: null,
    taskStartDate: "",
    taskEndDate: "",
    taskAssignPerson: "",
    taskPriority: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      taskImages: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      // console.log(selectedEmployees);
      for (let obj of selectedEmployees) {
        // console.log(obj);
        formDataToSend.append("taskAssignPerson", obj.value);
      }
      const response = await axios.post(
        "http://localhost:8000/api/tasks",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //GET TASK
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTasks();
  }, []);

  //DELETE TASK
  const [deletableId, setDeletableId] = useState("");
  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/tasks/${deletableId}`
      );
      // console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // GET SINGLE TASK
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (searchQuery) => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/pros/search?id=${searchQuery}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error:", error);
        setTasks(null);
      }
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/tasks");
          setTasks(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  };

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/employees");
        setEmployees(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  // console.log(selectedEmployees);
  const assignEmployee = employees.map((emp) => {
    return {
      label: emp.employeeName,
      value: emp._id,
    };
  });

  // GET ALL PROJECTS
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);





  return (
    <>
      <div id="mytask-layout">
        <Sidebar />
        {/* main body area */}
        <div className="main px-lg-4 px-md-4">
          {/* Body: Header */}
          <Header />
          <>
            {/* Body: Body */}
            <div className="body d-flex py-lg-3 py-md-2">
              <div className="container-xxl">
                <div className="row align-items-center">
                  <div className="border-0 mb-4">
                    <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                      <h3 className="fw-bold mb-0">Task Management</h3>
                      <div className="col-auto d-flex w-sm-100">
                        <button
                          type="button"
                          className="btn btn-dark btn-set-task w-sm-100 me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#createtask"
                        >
                          <i className="icofont-plus-circle me-2 fs-6" />
                          Create Task
                        </button>
                        <div className="order-0">
                          <div className="input-group">
                            <input
                              type="search"
                              className="form-control"
                              aria-label="search"
                              aria-describedby="addon-wrapping"
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                handleSearch(e.target.value);
                              }}
                              placeholder="Enter Project Name"
                            />
                            <button
                              type="button"
                              className="input-group-text add-member-top"
                              id="addon-wrappingone"
                              data-bs-toggle="modal"
                              data-bs-target="#addUser"
                            >
                              <i className="fa fa-plus" />
                            </button>
                            <button
                              type="button"
                              className="input-group-text"
                              id="addon-wrapping"
                              onClick={handleSearch}
                            >
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* Row end  */}
                {tasks.map((task) => {
                  const getFormattedDate = (date) => {
                    const newDate = new Date(date);
                    const day = newDate.getDate();
                    const month = newDate.getMonth() + 1;
                    const year = newDate.getFullYear();

                    return `${day}/${month}/${year}`;
                  };

                  return (
                    
                    <div className="row clearfix  g-3" key={task._id}>
                      <div className="col-lg-12 col-md-12 flex-column">
                        <div className="taskboard g-3 py-xxl-4">
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4">
                            <div className="">
                              <div className="dd" data-plugin="nestable">
                                <ol className="dd-list">
                                  <li className="dd-item" data-id={1}>
                                    <div className="dd-handle">
                                      <div className="d-flex justify-content-between">
                                      <h6 className="fw-bold py-3 mb-0">
                                        {task.projectName}
                                      </h6>
                                      
                                      </div>
                                      
                                      <div className="task-info d-flex align-items-center justify-content-between">
                                        <h6 className="light-success-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                          {task.taskCategory}
                                        </h6>
                                        <div className="task-priority d-flex flex-column align-items-center justify-content-center">
                                        <div>
                                      <div className="avatar-list avatar-list-stacked m-0 d-flex justify-content-center">
                                            <img
                                              className="avatar rounded-circle small-avt"
                                              src={
                                                "http://localhost:8000/" +
                                                task.taskAssignPerson
                                                  .employeeImage
                                              }
                                              alt=""
                                            />
                                          </div>
                                          <p>
                                            {task.taskAssignPerson.employeeName}
                                          </p>
                                          </div>
                                          <span className="badge bg-danger text-end mt-2">
                                            {task.taskPriority}
                                          </span>
                                        </div>
                                      </div>
                                      <p className="py-2 mb-0 ">
                                        {task.description}
                                      </p>
                                      <div className="tikit-info row g-3 align-items-center">
                                        <div className="col-sm">
                                          <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                            <li className="me-2">
                                              <div className="d-flex align-items-center">
                                                Start Date :
                                                <span className="ms-1">
                                                  {getFormattedDate(
                                                    task.taskStartDate
                                                  )}
                                                </span>
                                              </div>
                                            </li>
                                            <li className="me-2">
                                              <div className="d-flex align-items-center">
                                                End Date :
                                                <span className="ms-1">
                                                  {getFormattedDate(
                                                    task.taskEndDate
                                                  )}
                                                </span>
                                              </div>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                          {/* <button
                                            type="button"
                                            className="btn light-danger-bg text-end small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createtask"
                                            onClick={() => {
                                              setDeletableId(task._id);
                                            }}
                                          >
                                            Edit
                                          </button> */}
                                          <button
                                            type="button"
                                            className="btn light-danger-bg text-end small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small"
                                            data-bs-toggle="modal"
                                            data-bs-target="#dremovetask"
                                            onClick={() => {
                                              setDeletableId(task._id);
                                            }}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <>
              {/* Modal Members*/}
              <div
                className="modal fade"
                id="addUser"
                tabIndex={-1}
                aria-labelledby="addUserLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title  fw-bold" id="addUserLabel">
                        Employee Invitation
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="inviteby_email">
                        <div className="input-group mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email address"
                            id="exampleInputEmail1"
                            aria-describedby="exampleInputEmail1"
                          />
                          <button
                            className="btn btn-dark"
                            type="button"
                            id="button-addon2"
                          >
                            Sent
                          </button>
                        </div>
                      </div>
                      <div className="members_list">
                        <h6 className="fw-bold ">Employee </h6>
                        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                          <li className="list-group-item py-3 text-center text-md-start">
                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                              <div className="no-thumbnail mb-2 mb-md-0">
                                <img
                                  className="avatar lg rounded-circle"
                                  src="assets/images/xs/avatar2.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex-fill ms-3 text-truncate">
                                <h6 className="mb-0  fw-bold">
                                  Rachel Carr(you)
                                </h6>
                                <span className="text-muted">
                                  rachel.carr@gmail.com
                                </span>
                              </div>
                              <div className="members-action">
                                <span className="members-role ">Admin</span>
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn bg-transparent dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="icofont-ui-settings  fs-6" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-ui-password fs-6 me-2" />
                                        ResetPassword
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-chart-line fs-6 me-2" />
                                        ActivityReport
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item py-3 text-center text-md-start">
                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                              <div className="no-thumbnail mb-2 mb-md-0">
                                <img
                                  className="avatar lg rounded-circle"
                                  src="assets/images/xs/avatar3.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex-fill ms-3 text-truncate">
                                <h6 className="mb-0  fw-bold">
                                  Lucas Baker
                                  <a href="#" className="link-secondary ms-2">
                                    (Resend invitation)
                                  </a>
                                </h6>
                                <span className="text-muted">
                                  lucas.baker@gmail.com
                                </span>
                              </div>
                              <div className="members-action">
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn bg-transparent dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Members
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-check-circled" />
                                        <span>All operations permission</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="fs-6 p-2 me-1" />
                                        <span>
                                          Only Invite &amp; manage team
                                        </span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn bg-transparent dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="icofont-ui-settings  fs-6" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-delete-alt fs-6 me-2" />
                                        Delete Member
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item py-3 text-center text-md-start">
                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                              <div className="no-thumbnail mb-2 mb-md-0">
                                <img
                                  className="avatar lg rounded-circle"
                                  src="assets/images/xs/avatar8.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="flex-fill ms-3 text-truncate">
                                <h6 className="mb-0  fw-bold">Una Coleman</h6>
                                <span className="text-muted">
                                  una.coleman@gmail.com
                                </span>
                              </div>
                              <div className="members-action">
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn bg-transparent dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Members
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="icofont-check-circled" />
                                        <span>All operations permission</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        <i className="fs-6 p-2 me-1" />
                                        <span>
                                          Only Invite &amp; manage team
                                        </span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="btn-group">
                                  <div className="btn-group">
                                    <button
                                      type="button"
                                      className="btn bg-transparent dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="icofont-ui-settings  fs-6" />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <a className="dropdown-item" href="#">
                                          <i className="icofont-ui-password fs-6 me-2" />
                                          ResetPassword
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#">
                                          <i className="icofont-chart-line fs-6 me-2" />
                                          ActivityReport
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#">
                                          <i className="icofont-delete-alt fs-6 me-2" />
                                          Suspend member
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#">
                                          <i className="icofont-not-allowed fs-6 me-2" />
                                          Delete Member
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create task*/}
              <div
                className="modal fade"
                id="createtask"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title  fw-bold"
                        id="createprojectlLabel"
                      >
                        {" "}
                        Create Task
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Project Name</label>
                        {/* <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput77"
                          placeholder="Project Name"
                          name="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                        /> */}
                        <select
                          className="form-select"
                          placeholder="Add Category"
                          aria-label="Default select Project Category"
                          name="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                        >
                          <option>Chosse Project</option>
                          {projects.map((project) => (
                            <option
                              key={project.id}
                              value={project.projectName}
                            >
                              {project.projectName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Task Category</label>
                        <select
                          className="form-select"
                          placeholder="Add Category"
                          aria-label="Default select Project Category"
                          name="taskCategory"
                          value={formData.taskCategory}
                          onChange={handleChange}
                        >
                          <option selected="Add Category">Add Category</option>
                          <option value={"UI/UX Design"}>UI/UX Design</option>
                        <option value={"Website Developement"}>Website Developement</option>
                        <option value={"App Development"}>
                          App Development
                        </option>
                        {/* <option value={"Quality Assurance"}>
                          Quality Assurance
                        </option>
                        <option value={"Development"}>Development</option>
                        <option value={"Backend Development"}>
                          Backend Development
                        </option>
                        <option value={"Software Testing"}>
                          Software Testing
                        </option>
                        <option value={"Website Design"}>Website Design</option> */}
                        <option value={"Digital Marketing"}>Digital Marketing</option>
                        {/* <option value={"SEO"}>SEO</option> */}
                        {/* <option value={"Other"}>Other</option> */}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="formFileMultipleone"
                          className="form-label"
                        >
                          Task Images &amp; Document
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFileMultipleone"
                          multiple=""
                          name="taskImages"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="deadline-form mb-3">
                        <form>
                          <div className="row">
                            <div className="col">
                              <label
                                htmlFor="datepickerded"
                                className="form-label"
                              >
                                Task Start Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="datepickerded"
                                name="taskStartDate"
                                value={formData.taskStartDate}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col">
                              <label
                                htmlFor="datepickerdedone"
                                className="form-label"
                              >
                                Task End Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="datepickerdedone"
                                name="taskEndDate"
                                value={formData.taskEndDate}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-sm">
                          <label className="form-label">
                            Task Assign Person
                          </label>
                          <div>
                            <MultiSelect
                              options={assignEmployee}
                              value={selectedEmployees}
                              onChange={setSelectedEmployees}
                              labelledBy="Select Employees"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-sm">
                          <label className="form-label">Task Priority</label>
                          <select
                            className="form-select"
                            aria-label="Default select Priority"
                            name="taskPriority"
                            value={formData.taskPriority}
                            onChange={handleChange}
                          >
                            <option placeholder="set priority">
                              Set Priority
                            </option>
                            <option value={"Heighest"}>Heighest</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"Lowest"}>Lowest</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea786"
                          className="form-label"
                        >
                          Description (optional)
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea786"
                          rows={3}
                          placeholder="Explain The Task What To Do & How To Do"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal  Delete Task*/}
              <div
                className="modal fade"
                id="dremovetask"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title  fw-bold"
                        id="dremovetaskLabel"
                      >
                        {" "}
                        Delete Task Permanently?
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body justify-content-center flex-column d-flex">
                      <i className="icofont-ui-delete text-danger display-2 text-center mt-2" />
                      <p className="mt-4 fs-5 text-center">
                        You can only delete this Task Permanently
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger color-fff"
                        onClick={handleDeleteProject}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </>
          </>
        </div>
      </div>
    </>
  );
};

export default Tasks;
