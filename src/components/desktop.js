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
      style: { backgroundColor: "transparent" },
    },
    {
      id: "2",
      title: "Photos",
      icon: "empty",
      component: <AppWindow open={true} title={"second title!"} contents={<Resizeable/>}/>,
      style: { backgroundColor: "transparent" },
    },
    {
      id: "3",
      title: "Music",
      icon: "empty",
      component: <AppWindow open={true} />,
      style: { backgroundColor: "transparent" },
    },
    {
      id: "4",
      title: "Trivia",
      icon: "empty",
      component: <AppWindow open={true} />,
      style: { backgroundColor: "transparent" },
    },
  ];

  const [applications, setApplications] = useState(initialAppStates);


  const launchApp = (app) => {
    render(app);
  };

  // single-click, color app-icon. Double-click, launch app
  const handleClick = (event, key, app) => {
    updateObjectInArray(app[key])


    if (event.detail === 2) {
      setOpenApps((current) => [...current, app[key]]);
      launchApp(app[key].component);
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
        if (app.id == selectedApp.id) {
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
        }));
    };

  return (
    <div className="desktop-background">
      <button onClick={() => console.log(openApps)}>CONSOLE LOG</button>
      <div className="parent" onClick={() => deselectApps}>
        {applications.map((app, key, appComp) => (
          <div
            className={"app-grid" + app.id}
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