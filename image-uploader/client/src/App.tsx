import { useState, ChangeEvent, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Final } from "./components/Final";
import { ProgressBar } from "./components/Progress";

import "./styles/app.css";

function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    uploadImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
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
  const uploadImage = async (imageFile: File) => {
    startLoading();
    const result = await fetch("/upload", {
      method: "POST",
      body: imageFile,
    }).then((res) => {
      stopLoading();
      return res.json();
    });
    setImage(result.imageUrl);
  };
  if (image !== null) return <Final alt="something" url={image} />;
  return (
    <>
      {!loading ? (
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
            <button
              onClick={() => imgRef.current && imgRef.current.click()}
              className="btn bg-primary"
            >
              Choose a file
            </button>
            <input
              onChange={handleImage}
              ref={imgRef}
              type="file"
              className="btn bg-primary"
              id="file-upload"
              name="img"
              accept="image/*"
            />
          </div>
        </div>
      ) : (
        <ProgressBar />
      )}
    </>
  );
}

export default App;
