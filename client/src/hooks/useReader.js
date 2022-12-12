import { useState, useEffect, useMemo, useCallback } from 'react';

const useReader = () => {
  const [imageURL, setImageURL] = useState(null);
  const reader = useMemo(() => new FileReader(), []);

  const setURLReader = useCallback(() => {
    setImageURL(reader.result);
  }, [reader.result]);

  useEffect(() => {
    reader.addEventListener('load', setURLReader);
    return () => reader.removeEventListener('load', setURLReader);
  }, [reader, setURLReader]);

  return { imageURL, setImageURL, reader };
};

export default useReader;
