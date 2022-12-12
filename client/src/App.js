import './App.css';
import ImageUploader from './components/ImageUploader/ImageUploader';
import { ResizeForm } from './components/FormContainer/ResizeForm';
import useList from './hooks/useList';

function App() {
  const { imgList, getListOfImgs } = useList();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Resizing App</h1>
        <p>FWD Udacity first project</p>
      </header>
      <h2>Upload Image From Your Local Machine To Database</h2>

      <ImageUploader updateList={getListOfImgs} />
      <h2>Pick Image From Database & Resize It</h2>
      <ResizeForm imgList={imgList} />
      {/* <HowToUse /> */}
    </div>
  );
}

export default App;
