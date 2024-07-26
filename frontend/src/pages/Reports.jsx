import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loading.css";
import { useNavigate } from "react-router-dom";

const MembersReport = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeCompany: "",
    employeeImage: null,
    employeeId: "",
    joiningDate: "",
    // username: "",
    password: "",
    emailid: "",
    phone: "+91 ",
    department: "",
    designation: "",
    description: "",
  });

  //   GET EMPLOYEES
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/employees`
        );

        let lastOldId = 1;
        response.data.forEach((d) => {
          const newId = parseInt(d.employeeId.slice(2), 10);
          if (!Number.isNaN(newId) && newId > lastOldId) {
            lastOldId = newId;
          }
        });

        const newId = `TN00${lastOldId + 1}`;
        setFormData((prevFormData) => ({
          ...prevFormData,
          employeeId: newId,
        }));
        setEmployees(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // GET SINGLE EMPLOYEE
  const handleSearch = async (searchQuery) => {
    if (searchQuery !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}api/search?id=${searchQuery}`
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error:", error);
        setEmployees(null);
      }
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}api/employees`
          );
          setEmployees(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
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
                <div className="row clearfix">
                  <div className="col-md-12">
                    <div className="card border-0 mb-4 no-bg">
                      <div className="card-header py-3 px-0 d-sm-flex align-items-center  justify-content-between border-bottom">
                        <h3 className=" fw-bold flex-fill mb-0 mt-sm-0">
                          Employees Report
                        </h3>
                        <button
                          type="button"
                          className="btn btn-dark me-1 mt-1 w-sm-100"
                          data-bs-toggle="modal"
                          data-bs-target="#createemp"
                        >
                          <i className="icofont-plus-circle me-2 fs-6" />
                          Add Employee
                        </button>
                        <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
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
                              placeholder="Enter Employee Name"
                            />
                            <button
                              type="button"
                              className="input-group-text"
                              id="addon-wrapping"
                              onClick={() => handleSearch(searchQuery)}
                            >
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        {loading ? (
                          <div>Loading...</div>
                        ) : (
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Total Task</th>
                                <th>Performance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {employees.length > 0 ? (
                                employees.map((employee) => (
                                  <tr key={employee.employeeId}>
                                    <td>{employee.employeeId}</td>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.description}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4">No employees found.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Row End */}
              </div>
            </div>
          </>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default MembersReport;
