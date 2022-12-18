import taskbarAppBackgroundDefault from "../.././images/desktop-taskbar-app.png";
import taskbarAppBackgroundOver from "../.././images/desktop-taskbar-app-hover.png";
import taskbarAppBackgroundDown from "../.././images/desktop-taskbar-app-focus.png";
import taskbarAppBackgroundSelected from "../.././images/desktop-taskbar-app-selected.png";
import './taskbar.css';
import { useState } from "react";

export default function TaskbarApps(props) {
  const [taskbarImage, setTaskbarBackground] = useState(
    taskbarAppBackgroundDefault
  );
  const selectedStyle = {
    boxShadow: "0px 0px 5px #00138c",
    filter: "brightness(60%)",
  };

  // Defines taskbar app background on different events
  const setTaskbarAppBackgroundState = () => {
    return {
      onMouseOver: () => setTaskbarBackground(taskbarAppBackgroundOver),
      onMouseLeave: () => setTaskbarBackground(taskbarAppBackgroundDefault),
      onMouseDownCapture: () => setTaskbarBackground(taskbarAppBackgroundDown),
      onMouseUp: () => setTaskbarBackground(taskbarAppBackgroundDefault),
    };
  };

  return (
    <div className={"taskbar-application"} {...setTaskbarAppBackgroundState()}>
      <div className={"taskbar-app-title"}>
        <img className="taskbar-app-icon" src={props.icon}></img>
        {props.title}
      </div>
      <img src={taskbarImage} className={"taskbar-application-img"} style={props.isSelected ? selectedStyle : { filter: "grayscale(0%)" }}></img>
    </div>
  );
}