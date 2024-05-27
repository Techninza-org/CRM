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
          return <img src={`${import.meta.env.VITE_BASE_URL}${img}`} />;
        })}
      </div>
    </div>
  );
};

export default SingleProjectImage;
