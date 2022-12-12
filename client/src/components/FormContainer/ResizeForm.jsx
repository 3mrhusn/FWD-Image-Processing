import React, { useState } from 'react';
import { url } from '../../api/images.api';
import Spinner from '../Spinner/Spinner';
import './ResizeForm.css';

export const ResizeForm = ({ imgList }) => {
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.value) {
      setPreviewImg(e.target.value);
    }
  };
  return (
    <div className="form-container">
      <form
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        action={url}
        target="_blank"
        id="resize-form"
        name="resize-form"
      >
        <div className="list-container">
          <select
            name="filename"
            id="filename"
            defaultValue={''}
            className="dropdown"
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose an image
            </option>

            {imgList?.map((img) => (
              <option value={img} key={img}>
                {img}
              </option>
            ))}
          </select>
        </div>
        <div className="dims-inputs">
          <input
            pattern="[50-9999]"
            type="number"
            required
            placeholder="Width in px"
            min={50}
            max={9999}
            name="width"
          />
          <input
            required
            pattern="[50-9999]"
            type="number"
            min={50}
            max={9999}
            name="height"
            placeholder="Height in px"
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <button className="resize-btn" type="submit">
            Resize
          </button>
        )}
      </form>
      <div className="preview">
        {previewImg ? (
          <img src={url + `/${previewImg}`} alt="bla-bla-bla" />
        ) : (
          <span>Preview</span>
        )}
      </div>
    </div>
  );
};
