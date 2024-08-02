import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loading.css";

const CrmController = () => {
    const [role, setRole] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [accessRights, setAccessRights] = useState([]);
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

    const handleCheckboxChange = (event) => {
        const { id } = event.target;
        setAccessRights((prevAccessRights) => {
            if (prevAccessRights.includes(id)) {
                return prevAccessRights.filter((right) => right !== id);
            } else {
                return [...prevAccessRights, id];
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newAccess = {
                role,
                employees: selectedEmployee,
                access: accessRights,
            };
            await axios.post(`${import.meta.env.VITE_BASE_URL}api/crm-access`, newAccess);
            toast.success("Access created successfully!", {
                style: {
                    backgroundColor: "#4c3575",
                    color: "white",
                },
            });
            setTimeout(() => {
                window.location.reload();
            }, 5000);
            setRole('');
            setSelectedEmployee('');
            setAccessRights([]);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to create access.");
        }
    };

    return (
        <>
            <div id="mytask-layout">
                <Sidebar />
                <div className="main px-lg-4 px-md-4">
                    <Header />
                    <div className="body d-flex py-lg-3 py-md-2">
                        <div className="container-xxl">
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div className="card border-0 mb-4 no-bg">
                                        <div className="card-header py-3 px-0 d-flex align-items-center justify-content-between border-bottom">
                                            <h3 className="fw-bold flex-fill mb-0">CRM Controller</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <div className=''>
                                        <h5 className='fw-bold'>Role</h5>
                                        <input
                                            className='form-control'
                                            placeholder='Type a Role'
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="fw-bold">Employees</h5>
                                        <select
                                            className="form-control"
                                            value={selectedEmployee}
                                            onChange={(e) => setSelectedEmployee(e.target.value)}
                                        >
                                            <option value="">Select an Employee</option>
                                            {employees.map((employee) => (
                                                <option key={employee._id} value={employee._id}>
                                                    {employee.employeeName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mt-4'>
                                        <h5 className='fw-bold'>Give Access</h5>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Dashboard"
                                                id="Dashboard"
                                                onChange={handleCheckboxChange}
                                                checked={accessRights.includes('Dashboard')}
                                            />
                                            <label className="form-check-label" htmlFor="Dashboard">
                                                Dashboard
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Projects"
                                                id="Projects"
                                                onChange={handleCheckboxChange}
                                                checked={accessRights.includes('Projects')}
                                            />
                                            <label className="form-check-label" htmlFor="Projects">
                                                Projects
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Clients"
                                                id="Clients"
                                                onChange={handleCheckboxChange}
                                                checked={accessRights.includes('Clients')}
                                            />
                                            <label className="form-check-label" htmlFor="Clients">
                                                Clients
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Employees"
                                                id="Employees"
                                                onChange={handleCheckboxChange}
                                                checked={accessRights.includes('Employees')}
                                            />
                                            <label className="form-check-label" htmlFor="Employees">
                                                Employees
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="Accounts"
                                                id="Accounts"
                                                onChange={handleCheckboxChange}
                                                checked={accessRights.includes('Accounts')}
                                            />
                                            <label className="form-check-label" htmlFor="Accounts">
                                                Accounts
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="AccessController"
                                                id="AccessController"
                                                onChange={handleCheckboxChange}
                                                checked={accessRights.includes('AccessController')}
                                            />
                                            <label className="form-check-label" htmlFor="AccessController">
                                                Access Controller
                                            </label>
                                        </div>
                                        <div className='mt-4'>
                                            <button
                                                type="submit"
                                                className="btn btn-dark me-1 mt-1 w-sm-100"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default CrmController;
