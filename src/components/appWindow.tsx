import React, { useEffect, useRef, useState } from "react";
import { DraggableElement } from "./hooks/Draggable";

interface Props {
  appId: string;
  isSelected: boolean;
  zIndex: number;
  display: string;
  windowDimensions: {
    height: string;
    width: string;
    transform: string;
    borderRadius: string;
  };
  contents:string;
  icon: string;
  title: string;
  closeApp: (appId: string) => void;
  passZIndex: (appId: string) => void;
}


const AppWindow: React.FC<Props> = (props) => {
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const [zIndex, setZIndex] = useState(props.zIndex);
  const draggableRef = useRef<HTMLDivElement | null>(null); // enables dragging functionality  
  const [draggable, setDraggable] = useState(true); // draggable toggle
  
  // window dimensions
  const [display, setDisplay] = useState(props.display);
  const [maximized, setMaximized] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(props.windowDimensions);

  // maximizes application window; disables dragging
  function maximizeWindow() {
    if (maximized) {
      setWindowDimensions({ height: "50%", width: "50%", transform:"", borderRadius:"20px" });
      setMaximized(false);
      setDraggable(true);
    } else {
      setWindowDimensions({
        height: "100%",
        width: "100%",
        transform: "none",
        borderRadius: "0",
      });
      setMaximized(true);
      setDraggable(false);
    }
  }

  useEffect(() => {
    if (props.isSelected) setZIndex(props.zIndex);
    if(props.isSelected && display === "none") setDisplay("")
  }, [props.zIndex]);

  const closeAppHandler = (appId: string) => {
    props.closeApp(appId);
  };

  // parent function, updates z-index
  const zIndexHandler = () => {
    props.passZIndex(props.appId);
    setIsSelected(props.isSelected);
  };

  // Consider moving to desktop to facilitate deselection on minimization
  const minimizeWindow = () => {
    if (display === "none") {
      setDisplay("");
    } else {
      setDisplay("none");
    }
  };

  return (
    <DraggableElement
      dragElement={
        <div
          onMouseDownCapture={zIndexHandler}
          className={"topbar"}
          ref={draggableRef}
          style={
            props.isSelected ? { filter: "grayscale(0%)" } : { filter: "brightness(130%)" }
          }
        >
          <img src={props.icon} className="topbar-icon" />
          <div className="topbar-title">{props.title}</div>
          <div
              className="topbar-buttons"
              onMouseEnter={() => setDraggable(false)}
              onMouseLeave={() => {if(!maximized)setDraggable(true)}}
              style={
                maximized ? { marginRight: "20px" } : { marginRight: "0px" }
              }
            >
              <button onClick={() => minimizeWindow()}>
                <img
                  id="minimize"
                  alt="minimize button"
                  src="../images/application-topbar/desktop-app-topbar-minimize.png"
                  onMouseEnter={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-minimize-highlighted.png")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-minimize.png")
                  }
                  onMouseDownCapture={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-minimize-pressed.png")
                  }
                />
              </button>
              <button>
                <img
                  id="maximize"
                  src="../images/application-topbar/desktop-app-topbar-expand.png"
                  alt="maximize button"
                  onMouseEnter={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-expand-highlighted.png")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-expand.png")
                  }
                  onMouseDownCapture={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-expand-pressed.png")
                  }
                  onClick={() => maximizeWindow()}
                />
              </button>
              <button onClick={(e) => closeAppHandler(props.appId)}>
                <img
                  id="close"
                  src="../images/application-topbar/desktop-app-topbar-close.png"
                  alt="close button"
                  onMouseEnter={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-close-highlighted.png")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-close.png")
                  }
                  onMouseDownCapture={(e) =>
                    (e.currentTarget.src =
                      "../images/application-topbar/desktop-app-topbar-close-pressed.png")
                  }
                />
              </button>
            </div>
          </div>
        }
        parentElement={
            <div className="contents" onMouseDownCapture={zIndexHandler}
            >{props.contents}</div >
        }
        style={windowDimensions}
        display={display}
        zIndex={zIndex}
        dragEnabled={draggable}
        appId={props.appId}
      ></DraggableElement>
  );
}


export default AppWindow;
