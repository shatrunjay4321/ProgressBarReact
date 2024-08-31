import { useState } from "react";
import ProgressBar from "./ProgressBar";
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [idx, setIdx] = useState(-1);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    if(count < 3) {
      setIdx((prev) => prev + 1);
    }
    setList((prev) => [...prev, {key: Date.now(), progress: 0, status: count < 3}]);
  };

  const onComplete = (completedItem) => {
    setCount((prev) => prev - 1);
    const updatedList = list.map((item) =>
      item.key === completedItem.key ? { ...item, progress: 100, status: false } : item
    );

    if (idx + 1 < list.length) {
      updatedList[idx + 1] = { ...updatedList[idx + 1], status: true };
      setIdx((prev) => prev + 1);
    }

    setList(updatedList);
  }

  return (
    <div className="App">
      <button onClick={handleAdd}>Add Progress Bar</button>
      {(list || []).map((item) => (
        <ProgressBar
          key={item?.key}
          listItem={item}
          color={"#000"}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default App;
