import React, { useState, useEffect } from "react";
import Sidebar from "../employeeCompt/EmployeeSidebar";
import Header from "../employeeCompt/EmployeeHeader";
import axios from "axios";

const Tasks = () => {
  //   //CREATE TASK
  //   const [formData, setFormData] = useState({
  //     projectName: "",
  //     taskCategory: "",
  //     taskImages: null,
  //     taskStartDate: "",
  //     taskEndDate: "",
  //     taskAssignPerson: "",
  //     taskPriority: "",
  //     description: "",
  //   });

  //   const handleChange = (e) => {
  //     const { name, value, files } = e.target;
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: files ? files[0] : value,
  //     }));
  //   };

  //   const handleFileChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       taskImages: e.target.files[0],
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const formDataToSend = new FormData();
  //       for (let key in formData) {
  //         formDataToSend.append(key, formData[key]);
  //       }
  //        for (let obj of selectedEmployees) {
  //         // console.log(obj);
  //         formDataToSend.append("taskAssignPerson", obj.value);
  //       }
  //       const response = await axios.post(
  //         "http://localhost:8000/api/tasks",
  //         formDataToSend,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //       window.location.reload();
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   //GET TASK
  //   const [tasks, setTasks] = useState([]);

  //   useEffect(() => {
  //     const fetchTasks = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:8000/api/tasks");
  //         setTasks(response.data);
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };

  //     fetchTasks();
  //   }, []);

  //   //DELETE TASK
  //   const [deletableId, setDeletableId] = useState("");
  //   const handleDeleteProject = async () => {
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:8000/api/tasks/${deletableId}`
  //       );
  //       console.log(response.data);
  //       window.location.reload();
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  // GET SINGLE PROJECT
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

  //GET A TASK BY TOKEN
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const Token = localStorage.getItem("emp_token");
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:8000/api/author", {
          headers: {
            Authorization: Token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const [isDone, setIsDone] = useState(false);

  const doneClick = () => {
    setIsDone(true);
  };
  const clearClick = () => {
    setIsDone(false);
  };


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
                        <div className="row taskboard g-3 py-xxl-4">
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4">
                            <div className="">
                              <div className="dd" data-plugin="nestable">
                                <ol className="dd-list">
                                  <li className="dd-item" data-id={1}>
                                    <div className="dd-handle">
                                      <div className="d-flex justify-content-between">
                                        <h5 className="fw-bold">
                                          {task.projectName}
                                        </h5>
                                        {isDone && (
                                          <i className="bi bi-check-circle-fill text-success h5" />
                                        )}
                                      </div>
                                      <div className="task-info d-flex align-items-center justify-content-between">
                                        <h6 className="light-success-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                          {task.taskCategory}
                                        </h6>
                                        <div className="task-priority d-flex flex-column align-items-center justify-content-center">
                                          <div className="avatar-list avatar-list-stacked m-0">
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
                                          <div>
                                            {task.taskAssignPerson.employeeName}
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
                                        <div className="d-flex justify-content-around align-items-center">
                                          {/* <button
                                            type="button"
                                            className="btn light-danger-bg text-end small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createtask"
                                            onClick={() => {
                                              setDeletableId(task._id);
                                            }}
                                            disabled
                                          >
                                            Edit
                                          </button> */}
                                          <button
                                            type="button"
                                            className="btn bg-info text-end small text-truncate py-1 px-2 rounded-1 d-inline-block fw-bold small"
                                            onClick={doneClick}
                                          >
                                            Done
                                          </button>
                                          <button
                                            type="button"
                                            className="btn light-danger-bg text-end small text-truncate py-1 px-2 rounded-1 d-inline-block fw-bold small"
                                            onClick={clearClick}
                                          >
                                            Clear
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
          </>
        </div>
      </div>
    </>
  );
};

export default Tasks;
