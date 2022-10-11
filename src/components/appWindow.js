import { useRef, useState } from "react";
import { DraggableElement } from "./hooks/Draggable";


export function AppWindow(props) {
  // app information
  const [title, setTitle] = useState(props.title);
  const [contents, setContents] = useState(props.contents);
  const noteRef = useRef();

  // toggle for dragging window
  const [draggable, setDraggable] = useState(true);

  // window dimensions
  const [maximized, setMaximized] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    height: "50%",
    width: "50%",
  });

  const [backgroundColor2, setBackgroundColor] = useState({
    backgroundColor:"red"
  })

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

  const zIndexHandler = () => {
    props.passZIndex(noteRef);
    console.log(noteRef)
    console.log(props.zIndex);
  }

    // "minimizes" window - really just hides it
    const minimizeWindow = () => {
      setWindowDimensions({display:"none"})
    };



  return (
    <div ref={noteRef} id={"absoluteTest"}>
    <DraggableElement
      dragElement={ 
        <div className="topbar">
          <img className={"topbar-left"} src={require("../images/application-topbar/desktop-app-topbar-left.png")}/>
          <div className="topbar-title">{title}</div>
          <img className={"topbar-right"} src={require("../images/application-topbar/desktop-app-topbar-right.png")}/>
          <div className="topbar-buttons">
          <button id="minimize-button" onClick={() => minimizeWindow()}>
            
            <img
                alt="minimize button"
                src="../images/application-topbar/desktop-app-topbar-minimize.png"
                onMouseEnter={(e) => (e.currentTarget.src = "../images/application-topbar/desktop-app-topbar-minimize-highlighted.png")}
                onMouseLeave={(e) => (e.currentTarget.src = "../images/application-topbar/desktop-app-topbar-minimize.png")}
                onMouseDown={(e) => (e.currentTarget.src = "../images/application-topbar/desktop-app-topbar-minimize-pressed.png")}
              />
            </button>
            <button id="maximize-button" onClick={() => MaximizeWindow()}>
            <img
                src="../images/application-topbar/desktop-app-topbar-expand.png"
                alt="maximize button"
                
              />
            </button>
            <button id="close-button" onClick={zIndexHandler}>
              <img
                src="../images/application-topbar/desktop-app-topbar-close.png"
                alt="close button"
              />
            </button>
          </div>
        </div>
      }
      parentElement={
        <div>
          <div className="contents">{contents}</div>
        </div>
      }
      style={windowDimensions}
      style2={backgroundColor2}
      dragEnabled={draggable}
    ></DraggableElement>
    </div>
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
