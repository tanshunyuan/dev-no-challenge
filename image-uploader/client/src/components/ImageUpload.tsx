import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/app.css";

interface ImageUploadArgs {
  setLoading: (args: boolean) => void;
  setImage: (args: React.SetStateAction<null>) => void;
}
export const ImageUpload = ({ setLoading, setImage }: ImageUploadArgs) => {
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

  const handleImageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null) {
      const file: File = files[0];
      uploadImage(file);
    }
  };

  const uploadImage = async (imageFile: File) => {
    startLoading();
    const url = `https://freeimage.host/api/1/upload?key=${
      import.meta.env.VITE_FREEIMAGEHOST
    }`;
    const result = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: imageFile,
    }).then((res) => {
      stopLoading();
      return res.json();
    });
    setImage(result.imageUrl);
  };
  return (
    <>
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
          onChange={handleImageOnChange}
          ref={imgRef}
          type="file"
          className="btn bg-primary"
          id="file-upload"
          name="img"
          accept="image/*"
        />
      </div>
    </>
  );
};
