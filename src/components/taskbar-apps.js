import taskbarAppImage from ".././images/desktop-taskbar-app.png";
import taskbarAppImageHover from ".././images/desktop-taskbar-app-hover.png";
import taskbarAppImageFocus from ".././images/desktop-taskbar-app-focus.png";
import './taskbar.css';
import { useState } from "react";

export default function TaskbarApps(props) {
  const appIcon = props.icon;
  const appTitle = props.title;

  const [taskbarImage, setTaskbarImage] = useState(taskbarAppImage)


const setTaskbarAppState = () => {
  return {
      onMouseOver: () => setTaskbarImage(taskbarAppImageHover),
      onMouseLeave: () => setTaskbarImage(taskbarAppImage),
      onMouseDownCapture: () => setTaskbarImage(taskbarAppImageFocus),
      onMouseUp: () => setTaskbarImage(taskbarAppImage)
  };
}


return (
  <div className={"taskbar-application " + "taskbar-app-id-" + props.id}     {...setTaskbarAppState()}>
    <div className={"app-title"}
    ><img className="taskbar-app-icon" src={appIcon}></img>{appTitle}</div>
    <img 
    src={taskbarImage}

    className="taskbar-application-img"></img>
  </div>
);
}