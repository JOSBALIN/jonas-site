import startButton from "../../images/desktop-startbutton.png";
import taskBar from "../../images/desktop-startbar.png";
import taskBarRight from "../../images/desktop-startbar-right.png";
import startButtonHover from "../../images/desktop-startbutton-hover.png";
import startButtonPressed from "../../images/desktop-startbutton-pressed.png";
import TaskbarApps from "./taskbar-apps";
import { useState, useEffect } from "react";
import "./taskbar.css";
import StartMenu from "./startMenu";

export default function Taskbar(props) {
  const [time, setTime] = useState();
  const [startMenuVisibility, setstartMenuVisibility] = useState({
    display: "none",
  });
  const [startMenuClicked, setStartMenuClicked] = useState(false);
  const [taskbarApps, setTaskbarApps] = useState(props.openApps);

  useEffect(() => {
    setTaskbarApps(props.openApps);
  }, [props.openApps]);

  // Updating time in taskbar
  useEffect(() => {
    const timer = setInterval(() => {
      // padStart on minutes to add leading 0
      setTime(
        new Date().getHours().toString().padStart(2, "0") +
          ":" +
          new Date().getMinutes().toString().padStart(2, "0")
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const taskbarAppClick = (app) => {
    props.summonApplication(app);
  };

  // Hides menu if clicked outside of start button & menu
  const hideStartMenu = (e) => {
    if (e.target.id != "start-menu-button") {
      setstartMenuVisibility({ display: "none" });
      setStartMenuClicked(false);
    }
  };

  const showStartMenu = () => {
    setstartMenuVisibility();
    setStartMenuClicked(true);
  };

  return (
    <div className="taskbar noselect">
      <StartMenu
        style={startMenuVisibility}
        outsideClick={startMenuClicked}
        hideMenu={hideStartMenu}
        appList={props.appList}
        launchApplication={props.launchApplication}
      />

      <img className="start-bar" src={taskBar}></img>
      <img
        id="start-menu-button"
        className="start-button"
        src={startMenuClicked ? startButtonPressed : startButton}
        // Refactor these icon changes. Spaghetti right now.
        onMouseEnter={(e) => (e.currentTarget.src = startButtonHover)}
        onMouseDownCapture={() => showStartMenu()}
      ></img>

      <div className="taskbar-right">
        <div id="current-time">{time}</div>
        <img className="start-bar-right" src={taskBarRight}></img>
      </div>

      <div className="taskbar-middle">
        {taskbarApps.map((app, index) => (
          <div
            key={index}
            className={"taskbar-app"}
            onClick={() => taskbarAppClick(app)}
          >
            <TaskbarApps
              icon={app.icon}
              title={app.title}
              id={app.id}
              isSelected={app.isSelected}
            />
          </div>
        ))}
      </div>
    </div>
  );
}