import { useState, useEffect, useRef } from "react";
import "./App.css";
import { DATA } from "../src/constant/constant.js";
import FilterItem from "./componenets/filterItem.jsx";

function App() {
  const [image, setImage] = useState("");
  const [styleToApply, setStyle] = useState({});
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const imageRef = useRef();
  const [finalStyle, setFinalStyle] = useState({});

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          setImageHeight(img.height);
          setImageWidth(img.width);
        };
      };
      setImage(() => URL.createObjectURL(event.target.files[0]));
      reader.readAsDataURL(file);
    }
  };

  const handleChangeStyle = (filterName, data, unit) => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      [filterName]: parseInt(data) + unit,
    }));
  };

  const downloadClick = (dataURL) => {
    const downLoadLink = document.createElement("a");
    downLoadLink.href = dataURL;
    downLoadLink.download = "";
    document.body.appendChild(downLoadLink);
    downLoadLink.click();
    document.body.removeChild(downLoadLink);
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = parseInt(imageHeight);
    canvas.width = parseInt(imageWidth);
    const imageToDownload = document.createElement("img");
    imageToDownload.src = image;
    ctx.filter = getComputedStyle(imageRef.current).filter;
    ctx.drawImage(imageToDownload, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    downloadClick(dataURL);
  };

  const handleDeleteImage = () => {
    setFinalStyle({});
    setImage(null);
  };

  let str = "";
  useEffect(() => {
    for (const [key, value] of Object.entries(styleToApply)) {
      str += `${key}(${value}) `;
    }
    setFinalStyle((prev) => ({ ...prev, filter: str }));
  }, [styleToApply]);

  return (
    <div className="main">
      {image ? (
        <>
          <div className="imageDiv">
            <img
              ref={imageRef}
              style={finalStyle}
              src={image}
              alt="Drop image here.."
            />
            <button onClick={handleDeleteImage}>Delete</button>
            <button onClick={handleDownloadImage}>Download</button>
          </div>
          <div className="editing">
            {DATA.map((filter) => (
              <FilterItem
                data={filter}
                key={filter.filterName}
                handleChangeStyle={handleChangeStyle}
              />
            ))}
          </div>
        </>
      ) : (
        <input
          type="file"
          onChange={handleUploadImage}
          accept="image/png, image/gif, image/jpeg"
        />
      )}
    </div>
  );
}

export default App;
