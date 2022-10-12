import startButton from ".././images/desktop-startbutton.png";
import taskBar from ".././images/desktop-startbar.png";
import taskBarRight from ".././images/desktop-startbar-right.png";
import startButtonHover from ".././images/desktop-startbutton-hover.png";
import startButtonPressed from ".././images/desktop-startbutton-pressed.png";
import TaskbarApps from "./taskbar-apps";
import * as React from "react";
import { useState } from "react";
import "./taskbar.css";
import StartMenu from "./startMenu";
import { AppWindow } from "./appWindow";

export default function Taskbar(props) {
  const [time, setTime] = useState();
  const [openApps, setOpenApps] = useState(props.openApps);

  // Updating time in taskbar
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().getHours() + ":" + new Date().getMinutes());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const setAppListHandler = (index) => {
    props.setAppList(index)
  }



  return (
    <div className="taskbar noselect">
      <button onClick={() => console.log(props.openApps)}>CONSOLE</button>
    {/* <StartMenu/> */}
      <img className="start-bar" src={taskBar}></img>
      <img
        className="start-button"
        src={startButton}
        onMouseEnter={(e) => (e.currentTarget.src = startButtonHover)}
        onMouseLeave={(e) => (e.currentTarget.src = startButton)}
        onMouseDownCapture={(e) => (e.currentTarget.src = startButtonPressed)}
      ></img>
      
      <div className="taskbar-right">
        
        <div id="current-time">{time}</div>
        <img className="start-bar-right" src={taskBarRight}></img>
      </div>
      <div className="taskbar-middle">
        {props.openApps.reverse().map((app, index) => (
          <div className={"taskbar-app-div"+(index+1)} key={index}
          onClick={(e) => {setAppListHandler(index)}}>
            {/* {console.log(index + " " + app.title)} */}
            <TaskbarApps title={app.title}/>
          </div>
        ))}
      </div>
    </div>
  );
}
