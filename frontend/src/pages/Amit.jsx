import React, { useState } from 'react';
import axios from 'axios';

const UpdateProject = () => {
  const [projectFormData, setProjectFormData] = useState({
    projectName: '',
    projectCategory: '',
    projectImage: null,
    projectStartDate: '',
    projectEndDate: '',
    description: ''
  });

  const projectHandleChange = (e) => {
    const { name, value, files } = e.target;
    setProjectFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value // If it's a file input, store the file object, else store the value
    }));
  };

  const projectHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in projectFormData) {
        formDataToSend.append(key, projectFormData[key]);
      }

      // Make the PUT request to update the project
      const response = await axios.put('http://localhost:8000/api/projects/662ccaa811486258c303e361', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      // Handle success, e.g., show a success message or update UI
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={projectHandleSubmit}>
      <input type="text" name="projectName" value={projectFormData.projectName} onChange={projectHandleChange} />
      <input type="text" name="projectCategory" value={projectFormData.projectCategory} onChange={projectHandleChange} />
      <input type="file" name="projectImage" onChange={projectHandleChange} />
      <input type="date" name="projectStartDate" value={projectFormData.projectStartDate} onChange={projectHandleChange} />
      <input type="date" name="projectEndDate" value={projectFormData.projectEndDate} onChange={projectHandleChange} />
      <textarea name="description" value={projectFormData.description} onChange={projectHandleChange}></textarea>
      <button type="submit">Update Project</button>
    </form>
  );
};

export default UpdateProject;
