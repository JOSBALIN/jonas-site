import appBackgroundDefault from "../.././images/desktop-taskbar-app.png";
import appBackgroundHover from "../.././images/desktop-taskbar-app-hover.png";
import appBackgroundDown from "../.././images/desktop-taskbar-app-focus.png";
import { HoverTooltip } from "../hoverTooltip";
import './taskbar.css';
import { useState, useRef } from "react";

export default function TaskbarApps(props) {
  const [taskbarImage, setTaskbarBackground] = useState(appBackgroundDefault);
  const selectedAppStyle = {
    boxShadow: "0px 0px 5px #00138c",
    filter: "brightness(60%)",
  };

  // Defines taskbar app background on different events
  const setTaskbarAppBackgroundState = () => {
    return {
      onMouseOver: () => setTaskbarBackground(appBackgroundHover),
      onMouseDownCapture: () => setTaskbarBackground(appBackgroundDown),
      onMouseLeave: () => setTaskbarBackground(appBackgroundDefault),
      onMouseUp: () => setTaskbarBackground(appBackgroundDefault),
    };
  };

  return (
    <div className={"taskbar-application"} {...setTaskbarAppBackgroundState()}>
      <div className={"taskbar-app-title"}>
        <img className="taskbar-app-icon" src={props.icon}></img>
        {props.title}
      </div>
      <img src={taskbarImage} className={"taskbar-application-img"} style={props.isSelected ? selectedAppStyle : { filter: "grayscale(0%)" }}/>
    </div>
  );
}