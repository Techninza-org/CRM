import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loading.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskMessages, setTaskMessages] = useState([]); // State to store task messages
  const [selectedTaskId, setSelectedTaskId] = useState(null); // State to store selected task ID
  const [taskModalVisible, setTaskModalVisible] = useState(false); // State to control modal visibility

  //CREATE TASK

  const User = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    assignedBy: User.username || "",
    projectName: "",
    taskEndDate: "",
    taskAssignPerson: "",
    taskPriority: "",
    taskImages: null,
    description: "",
  });

  //Fetch Task
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [taskFormData, setTaskFormData] = useState({
    projectName: "",
    taskEndDate: "",
    taskAssignPerson: "",
    taskPriority: "",
    description: "",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats date to 'YYYY-MM-DD'
  };

  const [taskStatuses, setTaskStatuses] = useState({});
  const [activeTab, setActiveTab] = useState('All'); // State for active tab filter
  const [filterDate, setFilterDate] = useState(''); // Date for date filter
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const tasksPerPage = 10; // Number of tasks per page

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/tasks`);
        const formattedTasks = response.data.map(task => ({
          ...task,
          taskEndDate: formatDate(task.taskEndDate),
          taskDate: formatDate(task.taskDate),
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Initialize taskStatuses with existing task statuses
    const statuses = {};
    tasks.forEach(task => {
      statuses[task._id] = task.taskStatus;
    });
    setTaskStatuses(statuses);
  }, [tasks]);

  const taskHandleChange = (e, taskId) => {
    const { name, value, files } = e.target;
    setTasks((prevState) =>
      prevState.map((task) =>
        task._id === taskId
          ? { ...task, [name]: files ? files[0] : value }
          : task
      )
    );
  };

  const taskHandleSubmit = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      const formDataToSend = new FormData();
      delete taskToUpdate.taskAssignPerson;
      for (const key in taskToUpdate) {
        formDataToSend.append(key, taskToUpdate[key]);
      }
      selectedEmployees.forEach((obj) => {
        formDataToSend.append("taskAssignPerson", obj.value);
      });
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}api/tasks/${taskId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedTask = response.data;
      console.log(updatedTask);
      setTasks((prevState) =>
        prevState.map((task) => (task._id === taskId ? updatedTask : task))
      );
      toast.success("Task Updated Successfully!", {
        style: {
          backgroundColor: "#4c3575",
          color: "white",
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch task messages by task ID
  const fetchTaskMessages = async (taskId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/task-messages/${taskId}`);
      setTaskMessages(response.data);
      setSelectedTaskId(taskId);
      setTaskModalVisible(true); // Open the modal
    } catch (error) {
      console.error("Error:", error);
      setTaskMessages([]);
    }
  };

  // Filter tasks based on activeTab state and filterDate
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.taskDate);
    const selectedDate = new Date(filterDate);
    const isSameDate = filterDate === '' || taskDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];

    if (activeTab === 'All') {
      return isSameDate; // Show all tasks for the selected date
    } else if (activeTab === 'Not Started') {
      return task.taskStatus === 'Not Started' && isSameDate; // Filter tasks by Not Started status for the selected date
    } else {
      return task.taskStatus === activeTab && isSameDate; // Filter tasks by other statuses for the selected date
    }
  });

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredTasks.length / tasksPerPage)));

  // Previous page
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  // GET SINGLE TASK
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async (searchQuery) => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/pros/search?id=${searchQuery}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error:", error);
        setTasks(null);
      }
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/tasks`);
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
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div id="mytask-layout">
        <Sidebar />
        <div className="main px-lg-4 px-md-4">
          <Header />
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
                        data-bs-target="#createproject"
                      >
                        <i className="icofont-plus-circle me-2 fs-6"></i>
                        Create Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row clearfix g-3">
                <div className="col-sm-12 col-lg-12 col-md-12">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="flex-grow-1 bd-highlight">
                        <ul className="nav nav-tabs tab-body-header rounded mb-3 d-inline-flex w-sm-100">
                          <li className="nav-item">
                            <button
                              className={`nav-link ${activeTab === 'All' ? 'active' : ''}`}
                              onClick={() => setActiveTab('All')}
                            >
                              All
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className={`nav-link ${activeTab === 'Not Started' ? 'active' : ''}`}
                              onClick={() => setActiveTab('Not Started')}
                            >
                              Not Started
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className={`nav-link ${activeTab === 'In Progress' ? 'active' : ''}`}
                              onClick={() => setActiveTab('In Progress')}
                            >
                              In Progress
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className={`nav-link ${activeTab === 'Completed' ? 'active' : ''}`}
                              onClick={() => setActiveTab('Completed')}
                            >
                              Completed
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className={`nav-link ${activeTab === 'Cancelled' ? 'active' : ''}`}
                              onClick={() => setActiveTab('Cancelled')}
                            >
                              Cancelled
                            </button>
                          </li>
                        </ul>
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Filter by date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                          />
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => setFilterDate('')}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="input-group mt-2">
                            <input
                              type="search"
                              className="form-control"
                              placeholder="Search by ID..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() => handleSearch(searchQuery)}
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive">
                        {loading ? (
                          <div className="text-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Loading tasks...</p>
                          </div>
                        ) : (
                          <table className="table table-custom table-lg mb-0" id="tasks">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Project Name</th>
                                <th>Assign Person</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentTasks.length === 0 ? (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    No tasks found for the selected date.
                                  </td>
                                </tr>
                              ) : (
                                currentTasks.map((task) => (
                                  <tr key={task._id}>
                                    <td>{task._id}</td>
                                    <td>
                                      <input
                                        type="text"
                                        name="projectName"
                                        value={task.projectName}
                                        onChange={(e) => taskHandleChange(e, task._id)}
                                        className="form-control"
                                      />
                                    </td>
                                    <td>
                                      <MultiSelect
                                        options={employees.map(employee => ({
                                          label: employee.username,
                                          value: employee.username,
                                        }))}
                                        value={task.taskAssignPerson.split(',').map(person => ({
                                          label: person.trim(),
                                          value: person.trim(),
                                        }))}
                                        onChange={(selected) =>
                                          setTasks((prevState) =>
                                            prevState.map((prevTask) =>
                                              prevTask._id === task._id
                                                ? {
                                                    ...prevTask,
                                                    taskAssignPerson: selected.map((s) => s.value).join(', '),
                                                  }
                                                : prevTask
                                            )
                                          )
                                        }
                                        labelledBy="Select"
                                      />
                                    </td>
                                    <td>
                                      <select
                                        name="taskStatus"
                                        value={task.taskStatus}
                                        onChange={(e) => taskHandleChange(e, task._id)}
                                        className="form-control"
                                      >
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                      </select>
                                    </td>
                                    <td>
                                      <input
                                        type="date"
                                        name="taskDate"
                                        value={task.taskDate}
                                        onChange={(e) => taskHandleChange(e, task._id)}
                                        className="form-control"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="date"
                                        name="taskEndDate"
                                        value={task.taskEndDate}
                                        onChange={(e) => taskHandleChange(e, task._id)}
                                        className="form-control"
                                      />
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => taskHandleSubmit(task._id)}
                                      >
                                        Update
                                      </button>
                                      <button
                                        className="btn btn-secondary btn-sm ms-2"
                                        onClick={() => fetchTaskMessages(task._id)} // Fetch messages and open modal
                                      >
                                        View Messages
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <button className="btn btn-secondary" onClick={prevPage}>
                          Previous
                        </button>
                        <div>Page {currentPage}</div>
                        <button className="btn btn-secondary" onClick={nextPage}>
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>

      {/* Task Messages Modal */}
      {taskModalVisible && (
        <div className="modal show" id="taskMessagesModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Task Messages for Task ID: {selectedTaskId}</h5>
                <button type="button" className="close" onClick={() => setTaskModalVisible(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {taskMessages.length === 0 ? (
                  <p>No messages found for this task.</p>
                ) : (
                  <ul>
                    {taskMessages.map((message) => (
                      <li key={message._id}>
                        <strong>{message.sender}:</strong> {message.content}
                        <br />
                        <small>{new Date(message.timestamp).toLocaleString()}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setTaskModalVisible(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
