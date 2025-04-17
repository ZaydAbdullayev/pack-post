import { useState, useRef } from "react";
import { Bg } from "./components/bg";
import "./home.css";
import { items, positionPoint, positionPresets } from "./context/data";
import { Modal } from "./components/modal";
import {
  getPackAsImageData,
  savePackAsImage,
  uploadToImgbb,
} from "./context/fetch.service";
import { BiLoaderCircle } from "react-icons/bi";

const titles = ["Add Username", "Add Watermark"];

export const App = () => {
  const [posterItems, setPosterItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(titles[0]);
  const [username, setUsername] = useState("");
  const [watermark, setWatermark] = useState("");
  const [usernameColor, setUsernameColor] = useState("#000000");
  const [watermarkColor, setWatermarkColor] = useState("#000000");
  const [usernamePosition, setUsernamePosition] = useState(null);
  const [watermarkPosition, setWatermarkPosition] = useState(null);
  const [confirmPack, setConfirmPack] = useState(false);
  const [sending, setSending] = useState(false);

  const dragItemRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const droppedItem = JSON.parse(data);
      const posterRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - posterRect.left;
      const y = e.clientY - posterRect.top;
      setPosterItems((prev) => [...prev, { ...droppedItem, x, y }]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const startMove = (e, index) => {
    dragItemRef.current = index;
    offsetRef.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    document.addEventListener("mousemove", moveItem);
    document.addEventListener("mouseup", stopMove);
  };

  const moveItem = (e) => {
    const index = dragItemRef.current;
    if (index === null) return;
    const poster = document.querySelector(".poster");
    const rect = poster.getBoundingClientRect();
    const newItems = [...posterItems];
    // Check if the index is within the valid range of newItems
    if (index >= 0 && index < newItems.length) {
      newItems[index].x = e.clientX - rect.left - offsetRef.current.x;
      newItems[index].y = e.clientY - rect.top - offsetRef.current.y;
      setPosterItems(newItems);
    }
  };

  const stopMove = () => {
    dragItemRef.current = null;
    window.removeEventListener("mousemove", moveItem);
    window.removeEventListener("mouseup", stopMove);
  };

  const removeItem = (index) => {
    setPosterItems((prev) => {
      //If the item is currently being moved, remove the listeners to prevent further errors
      if (dragItemRef.current === index) {
        window.removeEventListener("mousemove", moveItem);
        window.removeEventListener("mouseup", stopMove);
        dragItemRef.current = null;
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeAddition = (type) => {
    if (type === "username") {
      setUsername("");
      setUsernamePosition(null);
    }
    if (type === "watermark") {
      setWatermark("");
      setWatermarkPosition(null);
    }
    setIsOpen(false);
  };

  const determineClass = (key) => {
    if (key === usernamePosition) return "position-btn active";
    if (key === watermarkPosition) return "position-btn active";
    return "position-btn";
  };

  const downloadCard = async () => {
    const cardElement = document.querySelector(".poster");
    savePackAsImage(cardElement);
  };

  const shareOnX = async () => {
    setSending(true);
    const cardEl = document.querySelector(".poster");
    const imgUrl = await uploadToImgbb(await getPackAsImageData(cardEl));
    console.log(imgUrl);

    const tweetText = `
Rest in peace, my friend

$RIP
`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}&url=${encodeURIComponent(imgUrl)}`;
    window.open(tweetUrl, "_blank");
    setSending(false);
  };

  const reset = () => {
    setPosterItems([]);
    setUsername("");
    setWatermark("");
    setUsernamePosition(null);
    setWatermarkPosition(null);
    setConfirmPack(false);
  };

  return (
    <div className="degen-wrapper">
      <h1 className="title">DEGEN STARTER PACK</h1>
      <p className="subtitle">Create your own starter pack!</p>
      <div className="container">
        <div className="sidebar">
          <h2 className="sidebar-title">ITEMS</h2>
          <div className="grid-items-container">
            {items.map((item) => (
              <div
                className="grid-item"
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="poster-area">
          <div
            className="poster"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {posterItems.map((item, index) => (
              <div
                key={index}
                className="poster-img-wrapper"
                style={{ position: "absolute", top: item.y, left: item.x }}
                onMouseDown={(e) => startMove(e, index)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="poster-img"
                  style={{ width: 100 }}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  ✖
                </button>
              </div>
            ))}
            {username && (
              <div
                className="poster-img-wrapper"
                style={{
                  position: "absolute",
                  color: usernameColor,
                  ...positionPoint[usernamePosition],
                }}
              >
                <div className="username-placeholder">{username}</div>
                <button
                  className="remove-btn"
                  onClick={() => removeAddition("username")}
                >
                  ✖
                </button>
              </div>
            )}
            {watermark && (
              <div
                className="poster-img-wrapper"
                style={{
                  position: "absolute",
                  color: watermarkColor,
                  ...positionPoint[watermarkPosition],
                }}
              >
                <div className="watermark-placeholder">{watermark}</div>
                <button
                  className="remove-btn wt"
                  onClick={() => removeAddition("watermark")}
                >
                  ✖
                </button>
              </div>
            )}
          </div>
          <div className="buttons">
            {confirmPack ? (
              <>
                <button className="btn username" onClick={reset}>
                  Reset
                </button>
                <button className="btn confirm" onClick={downloadCard}>
                  Download Pack
                </button>
                <button className="btn post" onClick={shareOnX}>
                  Post to X {sending && <BiLoaderCircle className="loader" />}
                </button>
              </>
            ) : (
              <>
                {" "}
                <button
                  className="btn watermark"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedTitle(titles[1]);
                  }}
                >
                  + Watermark
                </button>
                <button
                  className="btn username"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedTitle(titles[0]);
                  }}
                >
                  + Username
                </button>
                <button
                  className="btn confirm"
                  onClick={() => setConfirmPack(true)}
                >
                  Confirm Pack
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="kid-illustration"></div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <input
          type="text"
          placeholder={`Enter ${selectedTitle}`}
          className="input"
          value={selectedTitle === titles[0] ? username : watermark}
          onChange={(e) => {
            if (selectedTitle === titles[0]) {
              setUsername(e.target.value);
            } else {
              setWatermark(e.target.value);
            }
          }}
        />
        <label className="color-picker">
          <span>Color</span>
          <input
            type="color"
            value={selectedTitle === titles[0] ? usernameColor : watermarkColor}
            onChange={(e) => {
              if (selectedTitle === titles[0]) {
                setUsernameColor(e.target.value);
              } else {
                setWatermarkColor(e.target.value);
              }
            }}
          />
        </label>
        <div className="positions">
          <span>Position</span>
          <div className="positions-container">
            {positionPresets.map((key) => (
              <button
                key={key}
                className={determineClass(key)}
                onClick={() => {
                  if (selectedTitle === titles[0]) {
                    setUsernamePosition(key);
                  } else {
                    setWatermarkPosition(key);
                  }
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="buttons">
          <button className="btn username" onClick={() => setIsOpen(false)}>
            ADD
          </button>
        </div>
      </Modal>
      <Bg />
    </div>
  );
};
