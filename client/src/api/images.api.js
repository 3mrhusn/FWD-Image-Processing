import axios from 'axios';

export const url = 'http://localhost:5000/api/images';

export const uploadFileService = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append('file', file);

  return axios.post(url + '/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};
