import "../App.css";
import * as React from "react";
import Taskbar from "./taskbar";
import { AppWindow } from "./appWindow";
import "./appWindow.css";
import "./desktop.css";
import { render } from "@testing-library/react";
import Resizeable from "./resizeable";
import { useState } from "react";
import AppIcon from "./appIcon";
import { useRef } from "react";

export default function Desktop() {
  // List of open apps to control taskbar icons
  const [openApps, setOpenApps] = useState([]);
  const [zIndex, setZIndex] = useState(1);

  const passZIndex = (ref) => {
    ref.current.style.zIndex = zIndex;
    setZIndex((zIndex) => zIndex + 1);
    console.log(zIndex);
  };

  // all applications to be displayed on the desktop, initial states
  const initialAppStates = [
    {
      id: "1",
      title: "My CV",
      icon: "empty",
      component: (
        <AppWindow title={"This is an App Title!"} passZIndex={passZIndex} zIndex={zIndex} />
      ),
      style: { backgroundColor: "transparent" },
    },
    {
      id: "2",
      title: "Photos",
      icon: "empty",
      component: (
        <AppWindow
          open={true}
          title={"second title!"}
          contents={<Resizeable />}
        />
      ),
      style: { backgroundColor: "transparent" },
    },
    {
      id: "3",
      title: "Music",
      icon: "empty",
      component: <AppWindow open={true} passZIndex={passZIndex} />,
      style: { backgroundColor: "transparent" },
    },
    {
      id: "4",
      title: "Trivia",
      icon: "empty",
      component: (
        <AppWindow open={true} title={"friend"} passZIndex={passZIndex} />
      ),
      style: { backgroundColor: "transparent" },
    },
  ];

  const [applications, setApplications] = useState(initialAppStates);

  const launchApp = (app) => {
    render(app)
  };

  // single-click, color app-icon. Double-click, launch app
  const handleClick = (event, key, app) => {
    updateObjectInArray(app[key]);

    if (event.detail === 2) {
      if (openApps.length <= 4) {
        setOpenApps((current) => [...current, app[key]]);
        console.log(app[key]);
        launchApp(app[key].component);
      } else
        alert(`You can't have more than five apps open at once
        Are you trying to crash this poor old PC?!`);
    }
  };

  // add an application to list
  const addApplication = (obj) => {
    setApplications((current) => [...current, obj]);
  };

  // set selected/deselected desktop app icon styles
  const updateObjectInArray = (selectedApp) => {
    setApplications((current) =>
      current.map((app) => {
        if (app.id === selectedApp.id) {
          return { ...app, style: { backgroundColor: "lightblue" } };
        } else return { ...app, style: { backgroundColor: "transparent" } };
      })
    );
  };

  // Sets all app-icons to have transparent background
  const deselectApps = () => {
    setApplications((current) =>
      current.map((app) => {
        return { ...app, style: { backgroundColor: "transparent" } };
      })
    );

    setOpenApps((current) =>
      current.map((app) => {
        return { ...app, style: { backgroundColor: "transparent" } };
      })
    );
  };

  return (
    <div className="desktop-background">
      <div className="parent" onClick={() => deselectApps}>
        {applications.map((app, key, appComp) => (
          <div
            className={"app-grid" + app.id + " prevent-select"}
            onClick={(event) => handleClick(event, key, appComp)}
            key={key}
            app={app.component}
            style={app.style}
          >
            <AppIcon title={app.title}></AppIcon>
          </div>
        ))}
      </div>
      <div className="desktop-frontlayer">
        <Taskbar className="taskbar" openApps={openApps} />
      </div>
    </div>
  );
}

// Button that creates a new application, internal use

// <button
// onClick={(e) =>
//   addApplication({
//     id: "5",
//     title: "Trivia2",
//     icon: "empty",
//     component: <AppWindow open={true} />,
//     selected: "false",
//     open: "false",
//     style: { backgroundColor: "lightblue" },
//   })
// }
// >
// asdasdsad
// </button>
