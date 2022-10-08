import "../App.css";
import * as React from "react";
import Taskbar from "./taskbar";
import { AppWindow } from "./appWindow";
import "./appWindow.css";
import "./desktop.css";
import { render } from "@testing-library/react";
import Resizeable from "./resizeable";
import { useState } from "react";

export default function Desktop() {
  // List of open apps to control taskbar icons
  const [openApps, setOpenApps] = useState([]);

  // all applications to be displayed on the desktop, initial states
  const initialAppStates = [
    {
      id: "1",
      title: "My CV",
      icon: "empty",
      component: <AppWindow open={true} title={"First title!"} />,
      selected: "false",
      open: "false",
      style: { backgroundColor: "transparent" },
    },
    {
      id: "2",
      title: "Photos",
      icon: "empty",
      component: <AppWindow open={true} title={"second title!"} contents={<Resizeable/>}/>,
      selected: "false",
      open: "false",
      style: { backgroundColor: "transparent" },
    },
    {
      id: "3",
      title: "Music",
      icon: "empty",
      component: <AppWindow open={true} />,
      selected: "false",
      open: "false",
      style: { backgroundColor: "transparent" },
    },
    {
      id: "4",
      title: "Trivia",
      icon: "empty",
      component: <AppWindow open={true} />,
      selected: "false",
      open: "false",
      style: { backgroundColor: "transparent" },
    },
  ];

  const [applications, setApplications] = useState(initialAppStates);

  const launchApp = (app) => {
    console.log("launch!");
    render(app);
  };

  const handleClick = (event, key, app) => {
    console.log(app);
    updateObjectInArray(app[key])

    console.log(applications);
    if (event.detail === 2) {
      launchApp(app[key].component);
    }
  };

  const addApplication = (obj) => {
    setApplications((current) => [...current, obj]);
  };

  // set selected/deselected desktop app icon styles
  const updateObjectInArray = (selectedApp) => {
    setApplications((current) =>
      current.map((app) => {
        console.log(app);
        if (app.id == selectedApp.id) {
          return { ...app, style: { backgroundColor: "lightblue" } };
        } else return { ...app, style: { backgroundColor: "transparent" } };
      })
    );
  };

    // ✅ Update one or more objects in a state array
    const deselectApps = () => {
      setApplications((current) =>
        current.map((app) => {
            return { ...app, style: { backgroundColor: "transparent" } };
        }));
    };

  return (
    <div className="desktop-background">
      <button onClick={() => console.log(applications)}>CONSOLE LOG</button>
      <button
        onClick={(e) =>
          addApplication({
            id: "5",
            title: "Trivia2",
            icon: "empty",
            component: <AppWindow open={true} />,
            selected: "false",
            open: "false",
            style: { backgroundColor: "lightblue" },
          })
        }
      >
        asdasdsad
      </button>
      <div className="parent" onClick={(event) => deselectApps}>
        {applications.map((app, key, appComp) => (
          <div
            className={"div" + app.id}
            onClick={(event) =>
              handleClick(event, key, appComp)
              //updateObjectInArray(app)
            }
            key={key}
            app={app.component}
            style={app.style}
          >
            {app.title}
            {app.selected}
          </div>
        ))}
      </div>
      <div className="desktop-frontlayer">
        {/* <AppWindow /> */}
        <Taskbar className="taskbar" />
      </div>
    </div>
  );
}
