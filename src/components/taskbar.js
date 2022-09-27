import startButton from ".././images/desktop-startbutton.png";
import taskBar from ".././images/desktop-startbar.png";
import taskBarRight from ".././images/desktop-startbar-right.png";
import * as React from "react";

export default function Taskbar() {
  const [time, setTime] = React.useState();

  // Updating time in taskbar
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().getHours() + ":" + new Date().getMinutes());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="taskbar">
      <img className="start-bar" src={taskBar}></img>
      <img className="start-button" src={startButton}></img>
      <div className="task-bar-right">
        <div id="current-time">{time}</div>
        <img className="start-bar-right" src={taskBarRight}></img>
      </div>
    </div>
  );
}
