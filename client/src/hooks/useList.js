import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const url = 'http://localhost:5000/api/images/';

const useList = () => {
  const [imgList, setImgList] = useState([]);

  const getListOfImgs = useCallback(() => {
    axios
      .get(url + 'all')
      .then((res) => {
        setImgList(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    getListOfImgs();
  }, [getListOfImgs]);
  return { imgList, setImgList, getListOfImgs };
};

export default useList;
