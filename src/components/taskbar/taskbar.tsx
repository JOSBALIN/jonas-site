import startButton from "../../images/desktop-startbutton.png";
import taskBar from "../../images/desktop-startbar.png";
import taskBarRight from "../../images/desktop-startbar-right.png";
import startButtonHover from "../../images/desktop-startbutton-hover.png";
import startButtonPressed from "../../images/desktop-startbutton-pressed.png";
import TaskbarApps from "./taskbar-apps";
import { useState, useEffect, useRef } from "react";
import "./taskbar.css";
import StartMenu from "./startMenu";
import React from "react";

interface TaskbarProps {
  openApps: Array<{
    id: string,
    title: string,
    icon: string,
    isSelected: boolean,
  }>,
  appList: Array<{
    id: string,
    title: string,
    icon: string,
  }>,
  launchApplication: (app: {
    id: string,
    title: string,
    icon: string,
    isSelected: boolean,
  }) => void
}

const Taskbar: React.FC<TaskbarProps> = (props) => {
  const [time, setTime] = useState<string>();
  const [startMenuVisibility, setstartMenuVisibility] = useState<{display: string}>({
    display: "none",
  });
  const [startMenuClicked, setStartMenuClicked] = useState(false);
  const [taskbarApps, setTaskbarApps] = useState(props.openApps);
  const ref = useRef<HTMLDivElement>(null);

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

  const taskbarAppClick = (app: {
    id: string,
    title: string,
    icon: string,
    isSelected: boolean,
  }) => {
    console.log(app)
    props.launchApplication(app);
  };

  // Hides menu if clicked outside of start button & menu
  const hideStartMenu = (e: React.MouseEvent) => {
    if (e.currentTarget.id != "start-menu-button") {
      setstartMenuVisibility({ display: "none" });
      setStartMenuClicked(false);
    }
  };

  const showStartMenu = () => {
    setstartMenuVisibility({display: ""});
    setStartMenuClicked(true);
  };

  useEffect(() => {
    // Add a mousedown event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Return a cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: MouseEvent) {
    // Check if the target of the event is within the component
    if (ref.current && !ref.current.contains(event.target as Node) && !startMenuClicked) {
      setstartMenuVisibility({display: "none"});
      setStartMenuClicked(false);
      console.log('Clicked outside');
    }
  }

  return (
    <div className="taskbar noselect">
      <div className="start-menu-ref-wrapper" ref={ref}>
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
        </div>
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
              isSelected={app.isSelected}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taskbar;

