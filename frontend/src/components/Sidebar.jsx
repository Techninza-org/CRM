import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        
        <>
            <div className="sidebar px-4 py-4 py-md-5 me-0">
                <div className="d-flex flex-column h-100">
                    <div className="mb-0 brand-icon">
                        <span className="logo-icon">
                        <img src='../Images/techninza-logo1.png' style={{height:"4rem"}}/>
                        </span>
                        <div>
                        <span className="logo-text fs-4">TECHNINZA</span>
                        <span className="logo-text" style={{fontSize:"10px"}}>TECHNOLOGY NINJAS</span>
                        </div>
                    </div>
                    {/* Menu: main ul */}
                    <ul className="menu-list flex-grow-1 mt-3">
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#dashboard-Components"
                                href="#"
                            >
                                <i className="icofont-home fs-5" /> <span>Dashboard</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse show" id="dashboard-Components">
                               
                                <li>
                                    <Link className="ms-link" to="/project-dashboard">
                                        {" "}
                                        <span>Admin Dashboard</span>
                                    </Link>
                                </li>
                                    {/* <li>
                                        <Link className="ms-link " to="/employee-dashboard">
                                            {" "}
                                            <span>Employee Dashboard</span>
                                        </Link>
                                    </li> */}
                            </ul>
                        </li>
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#project-Components"
                                href="#"
                            >
                                <i className="icofont-briefcase" />
                                <span>Projects</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse" id="project-Components">
                                <li>
                                <Link className="ms-link" to="/projects">
                                        <span>Projects</span>
                                    </Link>
                                </li>
                                <li>
                                <Link className="ms-link" to="/tasks">
                                        <span>Tasks</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <a className="ms-link" href="timesheet.html">
                                        <span>Timesheet</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="team-leader.html">
                                        <span>Leaders</span>
                                    </a>
                                </li> */}
                            </ul>
                        </li>
                        {/* <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#tikit-Components"
                                href="#"
                            >
                                <i className="icofont-ticket" /> <span>Tickets</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            <ul className="sub-menu collapse" id="tikit-Components">
                                <li>
                                    <a className="ms-link" href="tickets.html">
                                        {" "}
                                        <span>Tickets View</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="ticket-detail.html">
                                        {" "}
                                        <span>Ticket Detail</span>
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#client-Components"
                                href="#"
                            >
                                <i className="icofont-user-male" /> <span>Our Clients</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            <ul className="sub-menu collapse" id="client-Components">
                                <li>
                                <Link className="ms-link" to="/clients">
                                        
                                        <span>Clients</span>
                                    </Link>
                                </li>
                                {/* <li>
                                    <a className="ms-link" href="profile.html">
                                        {" "}
                                        <span>Client Profile</span>
                                    </a>
                                </li> */}
                            </ul>
                        </li>
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#emp-Components"
                                href="#"
                            >
                                <i className="icofont-users-alt-5" /> <span>Employees</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse" id="emp-Components">
                                <li>
                                    <Link className="ms-link" to="/members">
                                        {" "}
                                        <span>Members</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="ms-link" to="/members-report">
                                        {" "}
                                        <span>Members Report</span>
                                    </Link>
                                </li>
                                
                                {/* <li>
                                    <a className="ms-link" href="holidays.html">
                                        {" "}
                                        <span>Holidays</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="attendance-employees.html">
                                        {" "}
                                        <span>Attendance Employees</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="attendance.html">
                                        {" "}
                                        <span>Attendance</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="leave-request.html">
                                        {" "}
                                        <span>Leave Request</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="department.html">
                                        {" "}
                                        <span>Department</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="loan.html">
                                        {" "}
                                        <span>Loan</span>
                                    </a>
                                </li> */}
                            </ul>
                        </li>
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#menu-Componentsone"
                                href="#"
                            >
                                <i className="icofont-ui-calculator" /> <span>Accounts</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            <ul className="sub-menu collapse" id="menu-Componentsone">
                                {/* <li>
                                    <a className="ms-link" href="invoices.html">
                                        <span>Invoices</span>{" "}
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="payments.html">
                                        <span>Payments</span>{" "}
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="expenses.html">
                                        <span>Expenses</span>{" "}
                                    </a>
                                </li> */}
                                <li>
                                    <Link className="ms-link" to="/create-invoice">
                                        <span>Create Invoice</span>{" "}
                                    </Link>
                                </li>
                                <li>
                                    <Link className="ms-link" to="/all-invoice">
                                        <span>All Invoice</span>{" "}
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#payroll-Components"
                                href="#"
                            >
                                <i className="icofont-users-alt-5" /> <span>Payroll</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            <ul className="sub-menu collapse" id="payroll-Components">
                                <li>
                                    <a className="ms-link" href="salaryslip.html">
                                        <span>Employee Salary</span>{" "}
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                        {/* <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#app-Components"
                                href="#"
                            >
                                <i className="icofont-contrast" /> <span>App</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            <ul className="sub-menu collapse" id="app-Components">
                                <li>
                                    <a className="ms-link" href="calendar.html">
                                        {" "}
                                        <span>Calander</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="chat.html">
                                        <span>Chat App</span>
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                        {/* <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#extra-Components"
                                href="#"
                            >
                                <i className="icofont-code-alt" /> <span>Other Pages</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            <ul className="sub-menu collapse" id="extra-Components">
                                <li>
                                    <a className="ms-link" href="charts.html">
                                        {" "}
                                        <span>Apex Charts</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="forms.html">
                                        <span>Forms Example</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="table.html">
                                        {" "}
                                        <span>Table Example</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="review.html">
                                        <span>Reviews Page</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="icon.html">
                                        <span>Icons</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="contact.html">
                                        <span>Contact</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="widgets.html">
                                        <span>Widgets</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="todo-list.html">
                                        <span>Todo-List</span>
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                        {/* <li>
                            <a className="m-link" href="ui-elements/ui-alerts.html">
                                <i className="icofont-paint" /> <span>UI Components</span>
                            </a>
                        </li> */}
                    </ul>
                    <button
                        type="button"
                        className="btn btn-link sidebar-mini-btn text-light"
                    >
                        <span className="ms-2">
                            <i className="icofont-bubble-right" />
                        </span>
                    </button>
                </div>
            </div>
        </>
        
    )
}

export default Sidebar