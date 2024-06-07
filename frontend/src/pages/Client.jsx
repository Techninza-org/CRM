import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";



const Client = () => {
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
                                            <div className="card-header py-3 px-0 d-flex align-items-center  justify-content-between border-bottom">
                                                <h3 className=" fw-bold flex-fill mb-0">Clients</h3>
                                                <div className="col-auto d-flex">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark ms-1 "
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#createproject"
                                                    >
                                                        <i className="icofont-plus-circle me-2 fs-6" />
                                                        Add Client
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Row End */}
                                <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
                                    <div className="col">
                                        <div className="card teacher-card">
                                            <div className="card-body  d-flex">
                                                <div className="profile-av pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
                                                    <img
                                                        src="assets/images/lg/avatar3.jpg"
                                                        alt=""
                                                        className="avatar xl rounded-circle img-thumbnail shadow-sm"
                                                    />
                                                    <div className="about-info d-flex align-items-center mt-1 justify-content-center flex-column">
                                                        <h6 className="mb-0 fw-bold d-block fs-6 mt-2">Client Name</h6>
                                                        <div
                                                            className="btn-group mt-2"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#editproject"
                                                            >
                                                                <i className="icofont-edit text-success" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="teacher-info border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
                                                    <h6 className="mb-0 mt-2  fw-bold d-block fs-6">
                                                    Business Name
                                                    </h6>
                                                    <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted">
                                                        Phone No.
                                                    </span>
                                                    <div className="video-setting-icon mt-3 pt-3 border-top">
                                                        <p>
                                                            Vestibulum ante ipsum primis in faucibus orci luctus et
                                                            ultrices.Vestibulum ante ipsum primis in faucibus orci
                                                            luctus et ultrices
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>


                    <>
                        {/* Create Client*/}
                        <div
                            className="modal fade"
                            id="createproject"
                            tabIndex={-1}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                            {" "}
                                            Add Client
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
                                            <label htmlFor="exampleFormControlInput877" className="form-label">
                                                Client Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleFormControlInput877"
                                                placeholder="Client Name"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput977" className="form-label">
                                                Business Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleFormControlInput977"
                                                placeholder="Business Name"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="formFileMultipleoneone" className="form-label">
                                                Profile Image
                                            </label>
                                            <input
                                                className="form-control"
                                                type="file"
                                                id="formFileMultipleoneone"
                                            />
                                        </div>
                                        <div className="deadline-form">
                                            <form>
                                                <div className="row g-3 mb-3">

                                                    <div className="col">
                                                        <label
                                                            htmlFor="exampleFormControlInput477"
                                                            className="form-label"
                                                        >
                                                            Email ID
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="exampleFormControlInput477"
                                                            placeholder="Email ID"
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label
                                                            htmlFor="exampleFormControlInput277"
                                                            className="form-label"
                                                        >
                                                            Password
                                                        </label>
                                                        <input
                                                            type="Password"
                                                            className="form-control"
                                                            id="exampleFormControlInput277"
                                                            placeholder="Password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    {/* <div className="col">
                                                        <label
                                                            htmlFor="exampleFormControlInput177"
                                                            className="form-label"
                                                        >
                                                            User Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleFormControlInput177"
                                                            placeholder="User Name"
                                                        />
                                                    </div> */}
                                                    <div className="col">
                                                        <label
                                                            htmlFor="exampleFormControlInput777"
                                                            className="form-label"
                                                        >
                                                            Phone
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleFormControlInput777"
                                                            placeholder="Phone"
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="exampleFormControlTextarea78"
                                                className="form-label"
                                            >
                                                Description (optional)
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea78"
                                                rows={3}
                                                placeholder="Add any extra details about the request"
                                                defaultValue={""}
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
                                        <button type="button" className="btn btn-primary">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Edit Client*/}
                        <div className="modal fade" id="editproject" tabIndex={-1} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                            {" "}
                                            Edit Client
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
                                            <label htmlFor="exampleFormControlInput877" className="form-label">
                                                Client Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleFormControlInput877"
                                                placeholder="Client Name"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput977" className="form-label">
                                                Business Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleFormControlInput977"
                                                placeholder="Business Name"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="formFileMultipleoneone" className="form-label">
                                                Profile Image
                                            </label>
                                            <input
                                                className="form-control"
                                                type="file"
                                                id="formFileMultipleoneone"
                                            />
                                        </div>
                                        <div className="deadline-form">
                                            <form>
                                                <div className="row g-3 mb-3">

                                                    <div className="col">
                                                        <label
                                                            htmlFor="exampleFormControlInput477"
                                                            className="form-label"
                                                        >
                                                            Email ID
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="exampleFormControlInput477"
                                                            placeholder="Email ID"
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label
                                                            htmlFor="exampleFormControlInput277"
                                                            className="form-label"
                                                        >
                                                            Password
                                                        </label>
                                                        <input
                                                            type="Password"
                                                            className="form-control"
                                                            id="exampleFormControlInput277"
                                                            placeholder="Password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    {/* <div className="col">
                                                        <label
                                                            htmlFor="exampleFormControlInput177"
                                                            className="form-label"
                                                        >
                                                            User Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleFormControlInput177"
                                                            placeholder="User Name"
                                                        />
                                                    </div> */}
                                                    <div className="col">
                                                        <label
                                                            htmlFor="exampleFormControlInput777"
                                                            className="form-label"
                                                        >
                                                            Phone
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="exampleFormControlInput777"
                                                            placeholder="Phone"
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="exampleFormControlTextarea78"
                                                className="form-label"
                                            >
                                                Description (optional)
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea78"
                                                rows={3}
                                                placeholder="Add any extra details about the request"
                                                defaultValue={""}
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
                                        <button type="button" className="btn btn-primary">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal  Delete Folder/ File*/}
                        <div
                            className="modal fade"
                            id="deleteproject"
                            tabIndex={-1}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title  fw-bold" id="deleteprojectLabel">
                                            {" "}
                                            Delete item Permanently?
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
                                            You can only delete this item Permanently
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
                                        <button type="button" className="btn btn-danger color-fff">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>





                </div>
            </div>
        </>
    )
}

export default Client