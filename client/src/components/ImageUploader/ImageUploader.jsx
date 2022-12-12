import './ImageUploader.css';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import useReader from '../../hooks/useReader';
import { uploadFileService } from '../../api/images.api';

const fileTypes = ['JPG'];

const ImageUploader = ({ updateList }) => {
  const [file, setFile] = useState(null);
  const { imageURL, reader } = useReader();
  const [progress, setProgress] = useState(0);
  const handleChange = (file) => {
    setFile(file);
    reader.readAsDataURL(file);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    uploadFileService(file, (event) => {
      setProgress({ loaded: event.loaded, total: event.total });
      console.log(progress);
    })
      .then(() => {
        updateList();
      })
      .catch((err) => {
        console.log('Failed to upload file');
        console.log(err);
      });
  };
  return (
    <div className="image-container">
      {imageURL && <img src={imageURL} alt="to-upload" />}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <span className="hint">
          Hint !!
          <br />
          Before upload check that file of type .jpg & name not contain any
          special characters <br />
        </span>
        {imageURL && (
          <button onClick={handleUpload} className="upload-btn">
            Add To Database
          </button>
        )}
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
