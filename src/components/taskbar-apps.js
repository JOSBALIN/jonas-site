import taskbarAppImage from ".././images/desktop-taskbar-app.png";
import taskbarAppImageHover from ".././images/desktop-taskbar-app-hover.png";
import taskbarAppImageFocus from ".././images/desktop-taskbar-app-focus.png";
import './taskbar.css';
import { useState } from "react";

export default function TaskbarApps(props) {
  const appIcon = props.icon;
  const appTitle = props.title;

  const [taskbarImage, setTaskbarImage] = useState(taskbarAppImage)

  return (
    <div className="taskbar-application">
      <div className="app-title"
            onMouseEnter={(e) =>setTaskbarImage(taskbarAppImageHover)}
            onMouseLeave={(e) => setTaskbarImage(taskbarAppImage)}
            onMouseUp={(e) => setTaskbarImage(taskbarAppImageHover)}
            onMouseDownCapture={(e) => setTaskbarImage(taskbarAppImageFocus)}
      ><img className="app-icon" src={appIcon}></img>{appTitle}</div>
      <img 
      src={taskbarImage}
      onMouseEnter={(e) =>setTaskbarImage(taskbarAppImageHover)}
      onMouseLeave={(e) => setTaskbarImage(taskbarAppImage)}
      onMouseUp={(e) => setTaskbarImage(taskbarAppImageHover)}
      onMouseDownCapture={(e) => setTaskbarImage(taskbarAppImageFocus)}

      className="taskbar-application-img"></img>
    </div>
  );
}