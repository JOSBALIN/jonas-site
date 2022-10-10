import { useRef, useState } from "react";
import Draggable from "./hooks/draggable";
import { DraggableElement } from "./hooks/draggable";


export function AppWindow(props) {
  // app information
  const [title, setTitle] = useState(props.title);
  const [contents, setContents] = useState(props.contents);

  // toggle for dragging window
  const [draggable, setDraggable] = useState(true);

  // window dimensions
  const [maximized, setMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    height: "50%",
    width: "50%",
    display:"",
    zIndex:"0"
  });

  // maximizes application window; disables dragging
  const MaximizeWindow = () => {
    if (!maximized) {
      setWindowDimensions({ height: "100%", width: "100%", transform: "none" });
      setMaximized(true);
      setDraggable(false);
    } else {
      setWindowDimensions({ height: "50%", width: "50%" });
      setMaximized(false);
      setDraggable(true);
    }
  };

    // maximizes application window; disables dragging
    const minimizeWindow = () => {
      setWindowDimensions({display:"none"})
    };

  return (
    <DraggableElement
      dragElement={ 
        <div className="topbar">
          <div className="topbar-buttons">
          <button id="minimize-button" onClick={() => minimizeWindow()}>
            <img
                src="../images/application-topbar/desktop-app-topbar-minimize.png"
                alt="minimize button"
              />
            </button>
            <button id="maximize-button" onClick={() => MaximizeWindow()}>
            <img
                src="../images/application-topbar/desktop-app-topbar-expand.png"
                alt="maximize button"
                
              />
            </button>
            <button id="close-button" onClick={() => console.log("Hide")}>
              <img
                src="../images/application-topbar/desktop-app-topbar-close.png"
                alt="close button"
              />
            </button>
          </div>
          <div className="topbar-title">{title}</div>
        </div>
      }
      parentElement={
        <div>
          <div className="contents">{contents}</div>
        </div>
      }
      style={props.style}
      dragEnabled={draggable}
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
