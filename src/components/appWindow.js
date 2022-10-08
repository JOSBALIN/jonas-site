import { useRef, useState } from "react";
import Draggable from "./hooks/draggable";
import { DraggableElement } from "./hooks/draggable";

export function AppWindow(props) {

    // app information
    const [title, setTitle] = useState(props.title);
    const [contents, setContents] = useState(props.contents);

  // window dimensions
  const [maximized, setMaximized] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    height: "50%",
    width: "50%",
  });

  const MaximizeWindow = () => {
    if (!maximized) {
      setWindowDimensions({ height: "100%", width: "100%", transform: "none" });
      setMaximized(true);
    } else {
      setWindowDimensions({ height: "50%", width: "50%" });
      setMaximized(false);
    }
  };

  return (
    <DraggableElement
      dragElement={
        <div className="topbar">
          <div className="topbar-buttons">
          <button onClick={() => MaximizeWindow()}>O</button>
          <button onClick={() => console.log("Hide")}>X</button>
          </div>
          <div className="topbar-title">{title}</div>
        </div>
      }
      parentElement={
        <div>
          <div className="contents">{contents}</div>
        </div>
      }
      style={windowDimensions}
    ></DraggableElement>
  );
}

// Explainers
// <DraggableElement dragElement={element mouse hold} parentElement={parent to drag}

// useEffect explainer

// useEffect(() => {
//     This part runs when component is added to UI and states change
// })

// useEffect(() => {
//     code here
// },
// [dragging] <== This code only runs when this state is changed
//)

// useEffect(() => {
//     return () => This part runs when component is removed from UI
