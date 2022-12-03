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
  const [startMenuVisibility, setstartMenuVisibility] = useState({display:"none"})
  const [startMenuClick, setStartMenuClick] = useState(false)

  // Updating time in taskbar
  React.useEffect(() => {
    const timer = setInterval(() => {
      // padStart on minutes to add leading 0
      setTime(new Date().getHours().toString() + ":" + new Date().getMinutes().toString().padStart(2, '0'));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const taskbarAppClick = (index) => {
    // False to ensure method handles application as if it's not open
    props.summonApplication(index, false)
  }

  // Hides menu if clicked outside of start button & menu
  const hideStartMenu = (e) => {
    if(e.target.id != "start-menu-button")
      setstartMenuVisibility({ display: "none" });
  };

  const showStartMenu = () => {
    setstartMenuVisibility();
    setStartMenuClick(true)
  }


  return (
    <div className="taskbar noselect">
    <StartMenu style={startMenuVisibility} outsideClick={startMenuClick} hideMenu={hideStartMenu}/>
      <img className="start-bar" src={taskBar}></img>
      <img
        id="start-menu-button"
        className="start-button"
        src={startButton}
        // Refactor these icon changes. Spaghetti right now.
        onMouseEnter={(e) => (e.currentTarget.src = startButtonHover)}
        onMouseLeave={(e) => (e.currentTarget.src = startButton)}
        onMouseDown={(e) => (e.currentTarget.src = startButtonPressed)}
        onMouseDownCapture={(e) => showStartMenu()}
      ></img>
      
      <div className="taskbar-right">
        
        <div id="current-time">{time}</div>
        <img className="start-bar-right" src={taskBarRight}></img>
      </div>
      <div className="taskbar-middle">
        {props.openApps.reverse().map((app, index) => (
          <div className={"taskbar-app-div"+(index+1)} key={index}
          onClick={(e) => {taskbarAppClick(app.id)}}>
            <TaskbarApps icon={app.icon} title={app.title}/>
          </div>
        ))}
      </div>
    </div>
  );
}
