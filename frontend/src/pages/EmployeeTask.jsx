import React, { useState, useEffect } from "react";
import Sidebar from "../employeeCompt/EmployeeSidebar";
import Header from "../employeeCompt/EmployeeHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const Tasks = () => {

  // GET SINGLE TASK BY TOKEN
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (searchQuery) => {
    const Token = localStorage.getItem("emp_token");
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/pros/search?id=${searchQuery}`,
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
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/tasks`, {
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
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/employees`);
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
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/author`, {
          headers: {
            Authorization: Token,
          },
        });
        // console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  //Progress task
  // const [taskId, setTaskId] = useState("");
  const [taskStatuses, setTaskStatuses] = useState({});

  useEffect(() => {
    // Initialize taskStatuses with existing task statuses
    const statuses = {};
    tasks.forEach(task => {
      statuses[task._id] = task.taskStatus;
    });
    setTaskStatuses(statuses);
  }, [tasks]);

  const handleTaskUpdate = async (event, id) => {
    const { value } = event.target;
    let isCompleted = false;

    // Determine the completion status based on the selected value
    if (value === "Completed") {
      isCompleted = true;
    } else if (value === "Not Started" || value === "In Progress") {
      isCompleted = false;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}api/update/${id}`,
        { taskStatus: value, isCompleted }
      );

      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, taskStatus: value, isCompleted } : task
        )
      );

      // Update task status in local state for refreshing purpose
      setTaskStatuses({
        ...taskStatuses,
        [id]: value
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const [showFullDescription, setShowFullDescription] = useState("");


  const [taskMessages, setTaskMessages] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskMessage, setTaskMessage] = useState("");
  const [error, setError] = useState("");

  const user_id = JSON.parse(localStorage.getItem("emp_user"))._id;

  // Fetch task messages when a task is selected
  const fetchTaskMessages = async (task_id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/task-messages/${task_id}`);
      console.log(response.data);
      setTaskMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch task messages:', error);
    }
  };

  useEffect(() => {
    if (selectedTask) {
      fetchTaskMessages(selectedTask);
    }
  }, [selectedTask]);

  const handleTaskMessageSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/task-message`,
        {
          currentMessage: taskMessage,
          user_id: user_id,
          task_id: selectedTask,
        }
      );
      setTaskMessage("");
      setSelectedTask(null);
      fetchTaskMessages(selectedTask); // Refresh messages after submission

      const modal = document.getElementById('taskMessage');
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    } catch (error) {
      setError(error.message);
    }
  };


  const deleteTaskMessage = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}api/task-message/${id}`);
      setTaskMessages(taskMessages.filter(msg => msg._id !== id));
    } catch (error) {
      console.error('Failed to delete task message:', error);
    }
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

                            </div>
                            <div className="task-info d-flex align-items-center justify-content-between">
                              <h6 className="py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                <span className={`badge ${taskStatuses[task._id] === "Not Started" ? "bg-warning text-dark" : taskStatuses[task._id] === "In Progress" ? "bg-info text-dark" : "bg-success"}`}>
                                  {taskStatuses[task._id]}
                                </span>
                              </h6>
                              <div className="task-priority d-flex flex-column align-items-center justify-content-center">
                                <div className="avatar-list avatar-list-stacked m-0">
                                  <img
                                    className="avatar rounded-circle small-avt"
                                    src={`${import.meta.env.VITE_BASE_URL}${task.taskAssignPerson.employeeImage}`}
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
                                maxHeight: showFullDescription ? "none" : "11em",
                                overflowY: "auto",
                              }}
                            >
                              {task.description}

                            </p>
                            <div className="tikit-info row g-3 align-items-center">
                              <div className="col-sm">
                                <ul className="d-flex list-unstyled align-items-center justify-content-between">
                                  <li className="me-2">
                                    <div className="d-flex gap-5">
                                      <div className="d-flex align-items-center fw-bold">
                                        Due Date:
                                        <span className="ms-1">
                                          {getFormattedDate(task.taskEndDate)}
                                        </span>
                                      </div>
                                      <button
                                        className="d-flex justify-content-center bi bi-stopwatch btn outline-secondary text-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#taskMessage"
                                        onClick={() => setSelectedTask(task._id)}
                                      ></button>
                                    </div>
                                  </li>
                                </ul>
                                <div className="fw-bold">Task Given By - {task.assignedBy}</div>
                              </div>

                              <div className="d-flex justify-content-between align-items-center">

                                <select
                                  className="form-select"
                                  aria-label="Default select Status"
                                  name="taskStatus"
                                  onChange={(e) => handleTaskUpdate(e, task._id)}
                                  value={taskStatuses[task._id]}
                                >
                                  <option value="Not Started">Not Started</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>

                                <div className="btn-group" role="group" aria-label="Basic outlined example">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Task Message Modal */}
            <div
              className="modal fade"
              id="taskMessage"
              tabIndex={-1}
              aria-labelledby="taskMessageLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title fs-4 fw-bold" id="taskMessageLabel">
                      Task Message
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="mt-3">
                    {taskMessages.map((msg) => (
                      <div key={msg._id} className="d-flex justify-content-between container mt-2 border-bottom">
                        <div className="d-flex gap-5">
                          <div>
                            <img
                              className="avatar md rounded-circle"
                              src={
                                `${import.meta.env.VITE_BASE_URL}` +
                                msg.user_id.employeeImage
                              }
                              alt="employeeImage"
                            />
                            <p className="fw-bold">{msg.user_id.employeeName}</p>
                          </div>
                          <div>
                            <p className="fw-bold">{msg.currentMessage}</p>
                            <small className="text-muted">{new Date(msg.createdAt).toLocaleString()}</small>
                          </div>
                        </div>
                        <div className=" mt-3">
                          <button
                            onClick={() => deleteTaskMessage(msg._id)}
                            className="bi bi-trash bg-danger text-white border-0 rounded p-2"
                          >
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="taskMessage" className="form-label">
                          Add Message
                        </label>
                        <textarea
                          id="taskMessage"
                          rows="4"
                          className="form-control"
                          value={taskMessage}
                          onChange={(e) => setTaskMessage(e.target.value)}
                        />
                        {error && <div className="text-danger mt-2">{error}</div>}
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-dark"
                          onClick={handleTaskMessageSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </>
        </div>
      </div>
    </>
  );
};

export default Tasks;
