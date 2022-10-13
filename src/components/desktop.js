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
import { useEffect } from "react";
import MyCV from "./applications/myCV";

export default function Desktop() {
  // List of open apps to control taskbar icons
  const [openApps, setOpenApps] = useState([]);
  const [zIndex, setZIndex] = useState(1);
  const [appGridClasses, setAppGridClasses] = useState([]);

  // Get all instances of classes titled app-grid
  useEffect(() => {
    setAppGridClasses(Array.from(document.getElementsByClassName("app-grid")));
    console.log(appGridClasses);
  }, []);

  // Code for handling zIndex inspired by answer: https://stackoverflow.com/questions/65251195/how-to-change-z-index-of-components-in-react
  const passZIndex = (ref) => {
    setZIndex((zIndex) => zIndex + 1);
    ref.current.style.zIndex = zIndex;
  };

  // all applications to be displayed on the desktop, initial states
  const initialAppStates = [
    {
      id: "1",
      title: "My CV",
      icon: "empty",
      component: (
        <AppWindow title={"This is an App Title!"} passZIndex={passZIndex} />
      ),
      style: { backgroundColor: "" },
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
      style: { backgroundColor: "" },
    },
    {
      id: "3",
      title: "Music",
      icon: "empty",
      component: <AppWindow open={true} passZIndex={passZIndex} />,
      style: { backgroundColor: "" },
    },
    {
      id: "4",
      title: "Trivia",
      icon: "empty",
      component: (
        <AppWindow open={true} title={"friend"} passZIndex={passZIndex} />
      ),
      style: { backgroundColor: "" },
    },
  ];

  const [applications, setApplications] = useState(initialAppStates);

  // Handles class delegation of selected icons
  const appIconSelection = (key) => {
    appGridClasses.map((appGrid) => {
      if (appGrid.className.length > 12) {
        appGrid.className = appGrid.className.slice(0, 10);
      }

      if (parseInt(appGrid.className.slice(-1)) == key + 1) {
        appGrid.className += " selected";
      }
    });
  };

  // single-click, color app-icon. Double-click, launch app
  const handleClick = (event, key, app) => {
    appIconSelection(key);

    if (event.detail === 2) {
      console.log(openApps);

      if (openApps.includes(app[key]))
        return alert("This app is already open!");

      if (openApps.length <= 4) {
        setOpenApps((current) => [...current, app[key]]);
        appIconSelection(-1); // resets icon selection
      } else
        alert(`You can't have more than five apps open at once
        Are you trying to crash this poor old PC?!`);
    }
  };

  const launchApplication = (app, index) => {
    return (
      <AppWindow
        passZIndex={passZIndex}
        title={app.title}
        zIndex={zIndex}
        appId={app.id}
        contents={MyCV}
      />
    );
  };

  // add an application to list
  const addApplication = (obj) => {
    setApplications((current) => [...current, obj]);
  };

  const deselectApps = () => {
    setApplications((current) =>
      current.map((app) => {
        if (app.style.backgroundColor == "lightblue") {
          console.log(app);
        }
        return { ...app, style: { backgroundColor: "transparent" } };
      })
    );
  };

  const summonApplication = (divId) => {
    const divStyle = document.getElementsByClassName(
      "draggable-parent app-container applicationId: " + divId
    )[0].style;
    setZIndex((zIndex) => zIndex + 1);
    divStyle.zIndex = zIndex;
    if (divStyle.display != "") {
      divStyle.display = "";
      divStyle.transform3d = 0;
      divStyle.left = 0;
    } else {
      divStyle.display = "none";
    }
  };

  return (
    <div className="desktop-background noselect">
      <button onClick={() => summonApplication(2)}>
        {" "}
        Click me to test Z-Index
      </button>
      <div className="parent">
        {applications.map((app, key, appComp) => (
          <div
            className={"app-grid " + app.id}
            onClick={(event) => handleClick(event, key, appComp)}
            key={key}
            app={app.component}
            style={app.style}
          >
            <AppIcon title={app.title}></AppIcon>
          </div>
        ))}
        {openApps.map((appComp, key) => (
          <div key={key}>{launchApplication(appComp, key)}</div>
        ))}
      </div>
      <div className="desktop-frontlayer">
        <Taskbar
          className="taskbar"
          openApps={openApps}
          summonApplication={summonApplication}
        />
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
