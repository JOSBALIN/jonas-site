import "../App.css";
import * as React from "react";
import Taskbar from "./taskbar";
import { AppWindow } from "./appWindow";
import "./Dialog.css";
import "./desktop.css";
import { render } from "@testing-library/react";
import Resizeable from "./resizeable";

export default function Desktop() {

  const applications = [
    {
      id: "1",
      title: "My CV",
      icon: "empty",
      component: <AppWindow open={true}/>,
      selected: "false",
      open: "false",
    },
    {
      id: "2",
      title: "Photos",
      icon: "empty",
      component: <AppWindow open={true}/>,
      selected: "false",
      open: "false",
    },
    {
      id: "3",
      title: "Music",
      icon: "empty",
      component: <AppWindow open={true}/>,
      selected: "false",
      open: "false",
    },
    {
      id: "4",
      title: "Trivia",
      icon: "empty",
      component: <AppWindow open={true}/>,
      selected: "false",
      open: "false",
    },
  ];

  const launchApp = (app) => {
    console.log("launch!");
    render(app);
  };

  const handleClick = (event, key, app) => {
    console.log(key);
    console.log(app)
    console.log(app[key].component)
    event.target.className = "selected";
    if (event.detail === 2) {
      launchApp(app[key].component);
    }
  };



  return (
    <div className="desktop-background">
      <div className="parent">
        {applications.map((app, key, appComp) => (
          <div className={"div"+app.id} onClick={event => handleClick(event, key, appComp)} key={key} app={app.component}>
            {app.title}
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
