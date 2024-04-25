import React, { useState } from 'react';
import axios from 'axios';

const ProjectFormModal = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectCategory: '',
    projectImages: [],
    projectStartDate: '',
    projectEndDate: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      projectImages: e.target.files
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:8000/api/projects', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="modal fade" id="createproject" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold" id="createprojectlLabel">
              Create Project
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">Project Name</label>
              <input type="text" className="form-control" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Explain what the Project Name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Project Category</label>
              <select className="form-select" name="projectCategory" value={formData.projectCategory} onChange={handleChange} aria-label="Default select Project Category">
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Website Design">Website Design</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="projectImages" className="form-label">Project Images &amp; Document</label>
              <input className="form-control" type="file" id="projectImages" name="projectImages" onChange={handleFileChange} multiple />
            </div>
            <div className="deadline-form">
              <div className="row g-3 mb-3">
                <div className="col">
                  <label htmlFor="projectStartDate" className="form-label">Project Start Date</label>
                  <input type="date" className="form-control" id="projectStartDate" name="projectStartDate" value={formData.projectStartDate} onChange={handleChange} />
                </div>
                <div className="col">
                  <label htmlFor="projectEndDate" className="form-label">Project End Date</label>
                  <input type="date" className="form-control" id="projectEndDate" name="projectEndDate" value={formData.projectEndDate} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description (optional)</label>
              <textarea className="form-control" id="description" name="description" rows={3} value={formData.description} onChange={handleChange} placeholder="Add any extra details about the request"></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormModal;
