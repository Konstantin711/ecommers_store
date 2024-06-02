import React, { useState, useCallback } from "react";

import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onImageUpload }) => {
    const onDrop = useCallback(
      (acceptedFiles) => {
        onImageUpload(acceptedFiles);
      },
      [onImageUpload]
    );
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: "image/*",
      multiple: false,
    });
  
    return (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Перетягніть зображення сюди ...</p>
        ) : (
          <p>Перетягніть зображення сюди, або натисніть для вибору файлу</p>
        )}
      </div>
    );
  };

  export default ImageUpload;