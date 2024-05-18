import React from "react";
import { useLocation } from "react-router-dom";

const SingleProjectImage = () => {

  const { state } = useLocation();
  const { projectName, images } = state;

  console.log(images);

  return (
    <div>
      <div>
        <h2>{projectName}</h2>
        {images.map((img) => {
          return <img src={`http://localhost:8000/${img}`} />;
        })}
      </div>
    </div>
  );
};

export default SingleProjectImage;
