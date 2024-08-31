/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";

function ProgressBar({ 
  color = "#ee3425",
  onComplete = () => {},
  listItem = {},
}) {
  const [progress, setProgress] = useState(0);

  const progressElementStyle = {
    position: "relative",
    width: `${progress}%`,
    height: "100%",
    backgroundColor: color,
    borderRadius: "10px",
  };

  useEffect(() => {
    if(listItem?.status) {
      const interval = setInterval(() => {
        if (progress < 99) {
          setProgress((prev) => prev + 1);
        } else {
          if(progress === 99) {
            setProgress((prev) => prev + 1);
            onComplete(listItem);
          }
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [progress, listItem.status]);

  return (
    <div className="progress">
      {listItem?.status || listItem?.progress === 100 ? <div style={progressElementStyle}>
        <div className="percentage">{progress}%</div>
      </div> : null}
    </div>
  );
}

export default ProgressBar;
