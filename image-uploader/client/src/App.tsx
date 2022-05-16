import React, { useState, ChangeEvent, useCallback } from "react";
import Dropzone, { FileWithPath, useDropzone } from "react-dropzone";
import "./styles/app.css";

function App() {
  const [image, setImage] = useState("");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    uploadImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null) {
      const file: File = files[0];
      uploadImage(file);
    }
  };
  const uploadImage = (imageFile: File) => {
    console.log(imageFile);
  };

  return (
    <div className="container">
      <div className="image-container">
        <div className="image-header">
          <h4>Upload your image</h4>
          <p>File should be Jpeg, Png...</p>
        </div>
        <div {...getRootProps({ className: "image-body" })}>
          <input {...getInputProps()} />
          <p>Drag and drop your image here</p>
        </div>
        <p className="image-divider">Or</p>
        <div className="image-action">
          <input
            type="file"
            className="btn bg-primary"
            id="file-upload"
            name="img"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
