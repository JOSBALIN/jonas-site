import taskbarAppBackgroundDefault from "../.././images/desktop-taskbar-app.png";
import taskbarAppBackgroundOver from "../.././images/desktop-taskbar-app-hover.png";
import taskbarAppBackgroundDown from "../.././images/desktop-taskbar-app-focus.png";
import './taskbar.css';
import { useState } from "react";

export default function TaskbarApps(props) {
  const [taskbarImage, setTaskbarBackground] = useState(taskbarAppBackgroundDefault)

  // Defines taskbar app background on different events
  const setTaskbarAppBackgroundState = () => {
    return {
        onMouseOver: ()        => setTaskbarBackground(taskbarAppBackgroundOver),
        onMouseLeave: ()       => setTaskbarBackground(taskbarAppBackgroundDefault),
        onMouseDownCapture: () => setTaskbarBackground(taskbarAppBackgroundDown),
        onMouseUp: ()          => setTaskbarBackground(taskbarAppBackgroundDefault)
    };
  }

return (
  <div className={"taskbar-application"}     {...setTaskbarAppBackgroundState()}>
    <div className={"app-title"}
    ><img className="taskbar-app-icon" src={props.icon}></img>{props.title}</div>
    <img 
    src={taskbarImage}

    className="taskbar-application-img"></img>
  </div>
);
}