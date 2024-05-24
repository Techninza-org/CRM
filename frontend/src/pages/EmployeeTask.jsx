import React, { useState, useEffect } from "react";
import Sidebar from "../employeeCompt/EmployeeSidebar";
import Header from "../employeeCompt/EmployeeHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const Tasks = () => {
  // // GET SINGLE PROJECT
  // const [searchQuery, setSearchQuery] = useState("");
  // const handleSearch = async (searchQuery) => {
  //   if (searchQuery !== "") {
  //     try {
  //       const response = await axios.get(
  //         `https://crm-front-back-26vy.onrender.com/api/pros/search?id=${searchQuery}`
  //       );
  //       setTasks(response.data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setTasks(null);
  //     }
  //   } else {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://crm-front-back-26vy.onrender.com/api/tasks"
  //         );
  //         setTasks(response.data);
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };

  //     fetchData();
  //   }
  // };

  // GET SINGLE TASK BY TOKEN
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (searchQuery) => {
    const Token = localStorage.getItem("emp_token");
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/pros/search?id=${searchQuery}`,
          {
            headers: {
              Authorization: Token,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error:", error);
        setTasks(null);
      }
    } else {
      try {
        const response = await axios.get("http://localhost:8000/api/tasks", {
          headers: {
            Authorization: Token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
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

  //done task
  // const [taskId, setTaskId] = useState("");
  const handleTaskUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/${id}`,
        { isCompleted: true }
      );
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, isCompleted: true } : task
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };
  const clearTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/${id}`,
        { isCompleted: false }
      );
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, isCompleted: false } : task
        )
      );
      // window.location.reload();
    } catch (error) {
      setError("Error clearing task");
    }
  };

  // //Task Chat
  // const [formData, setFormData] = useState({
  //   taskId: "",
  //   senderId: "",
  //   adminId: "",
  //   empId: "",
  //   message: "",
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:8000/api/chats", formData);
  //     console.log("New chat created:", res.data);
  //   } catch (err) {
  //     console.error("Error creating chat:", err);
  //   }
  // };

  // const [chats, setChats] = useState([]);
  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8000/api/chats/${taskId}`
  //       );
  //       setChats(res.data);
  //     } catch (err) {
  //       console.error("Error fetching chats:", err);
  //     }
  //   };

  //   fetchChats();
  // }, []);

  const [showFullDescription, setShowFullDescription] = useState("");

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
                        {/* <button
                          type="button"
                          className="btn btn-dark btn-set-task w-sm-100 me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#createtask"
                        >
                          <i className="icofont-plus-circle me-2 fs-6" />
                          Create Task
                        </button> */}
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
                <div className="row">
                  {tasks.map((task) => {
                    const getFormattedDate = (date) => {
                      const newDate = new Date(date);
                      const day = newDate.getDate();
                      const month = newDate.getMonth() + 1;
                      const year = newDate.getFullYear();

                      return `${day}/${month}/${year}`;
                    };

                    return (
                      <div className="col-md-4 mb-4" key={task._id}>
                        <div className="card" style={{ width: "18rem" }}>
                          <div className="card-body dd-handle">
                            <div className="d-flex justify-content-between">
                              <h5 className="fw-bold">{task.projectName}</h5>
                              {task.isCompleted && (
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
                                      task.taskAssignPerson.employeeImage
                                    }
                                    alt=""
                                  />
                                </div>
                                <div>{task.taskAssignPerson.employeeName}</div>
                                <span className="badge bg-danger text-end mt-2">
                                  {task.taskPriority}
                                </span>
                              </div>
                            </div>
                            <p
                              className="py-2 mb-0 task-description"
                              style={{
                                maxHeight: showFullDescription
                                  ? "none"
                                  : "11em",
                                overflowY: "auto",
                              }}
                            >
                              {task.description}
                            </p>
                            <div className="tikit-info row g-3 align-items-center">
                              <div className="col-sm">
                                <ul className="d-flex list-unstyled align-items-center justify-content-between">
                                  <li className="me-2">
                                    <div className="d-flex align-items-center fw-bold">
                                      Start:
                                      <span className="ms-1">
                                        {getFormattedDate(task.taskStartDate)}
                                      </span>
                                    </div>
                                  </li>
                                  <li className="me-2">
                                    <div className="d-flex align-items-center fw-bold">
                                      End:
                                      <span className="ms-1">
                                        {getFormattedDate(task.taskEndDate)}
                                      </span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                {task.isCompleted ? (
                                  <div>
                                    <button
                                      type="button"
                                      className="btn light-danger-bg text-end small text-truncate py-1 px-2 rounded-1 d-inline-block fw-bold small"
                                      onClick={() => clearTask(task._id)}
                                    >
                                      Clear
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn bg-info text-end small text-truncate py-1 px-2 rounded-1 d-inline-block fw-bold small"
                                    onClick={() => handleTaskUpdate(task._id)}
                                  >
                                    Done
                                  </button>
                                )}

                                <div
                                  className="btn-group"
                                  role="group"
                                  aria-label="Basic outlined example"
                                >
                                  {/* <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#chatUser"
                                  >
                                    <i className="bi bi-chat-left-text-fill text-primary" />
                                  </button> */}
                                  <Link
                                    to="/images"
                                    className="btn btn-outline-secondary"
                                    state={{
                                      images: task.taskImages,
                                      projectName: task.projectName,
                                    }}
                                  >
                                    <i className="bi-paperclip fs-6" />
                                  </Link>
                                </div>

                                {/* <a
                                  href={
                                    "http://localhost:8000/" +
                                    task.taskImages
                                  }
                                  target="_blank"
                                >
                                  <i className=" bi-paperclip fs-5" />
                                </a> */}
                              </div>
                              {/* <div></div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chat Modal */}
              {/* <div
                className="modal fade"
                id="chatUser"
                tabIndex={-1}
                aria-labelledby="chatUserLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title fs-4 fw-bold"
                        id="addUserLabel"
                      >
                        {tasks.projectName}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="members_list">
                        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                          <li className="list-group-item py-3 text-center text-md-start">
                            {chats.map((chat) => (
                              <li key={chat._id}>{chat.message}</li>
                            ))}
                          </li>
                        </ul>

                        <div className="row g-3 mb-3">
                        </div>
                        <div className="d-flex" style={{ gap: "6px" }}>
                          <textarea
                            rows="1"
                            cols=""
                            type="text"
                            className="form-control"
                            name="taskId"
                            value={formData.taskId}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="btn btn-dark"
                            onClick={handleSubmit}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Tasks;
