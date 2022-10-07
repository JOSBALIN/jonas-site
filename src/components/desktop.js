import "../App.css";
import * as React from "react";
import Taskbar from "./taskbar";
import { AppWindow } from "./appWindow";
import "./Dialog.css";
import "./desktop.css";
import { render } from "@testing-library/react";

export default function Desktop() {
  const iconStyles = {
    backgroundColor: "blue",
  };

  const applications = [
    { id: "1", appTitle: "My CV", appIcon: "empty", selected: "false" },
    { id: "2", appTitle: "Photos", appIcon: "empty", selected: "false" },
    { id: "3", appTitle: "Music", appIcon: "empty", selected: "false" },
    { id: "4", appTitle: "Trivia", appIcon: "empty", selected: "false" },
  ];

  const launchApp = () => {
    console.log("launch!");
    render(<AppWindow />);
  };

  const handleClick = (event) => {
    console.log(event.target);
    event.target.className= "selected";
    if (event.detail === 2) {
      launchApp();
    }
  };

  return (
    <div className="desktop-background">
      <div className="parent">
        {applications.map((app) => (
          <div key={app.id} className={"div" + app.id} onClick={handleClick}>
            {app.appTitle}
          </div>
        ))}
      </div>
      <div className="desktop-frontlayer">
        {/* <AppWindow /> */}
        <Taskbar />
      </div>
    </div>
  );
}
