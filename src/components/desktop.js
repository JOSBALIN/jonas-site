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
import PhotoViewer from "./applications/photoViewer";
import wordPadIcon from "../images/app-icons/app-icon-wordpad.png";
import photosIcon from "../images/app-icons/app-icon-photos.png";
import githubIcon from "../images/app-icons/app-icon-github.png";
import MusicPlayer from "./applications/musicPlayer";


export default function Desktop() {
  // List of open apps to control taskbar icons
  const [openApps, setOpenApps] = useState([]);
  const [zIndex, setZIndex] = useState(1);
  const [appGridClasses, setAppGridClasses] = useState([]);
  const [selectedApp, setSelectedApp] = useState([]);

  // Get all instances of classes titled app-grid
  useEffect(() => {
    setAppGridClasses(Array.from(document.getElementsByClassName("app-grid")));
  }, []);

  // Get all instances of classes titled app-grid
  useEffect(() => {
    setSelectedApp(
      Array.from(document.getElementsByClassName(" selected-app"))
    );
  }, []);


  const incrementZIndex = () => {
    setZIndex((zIndex) => zIndex + 1);
  };

  // Code for handling zIndex inspired by answer: https://stackoverflow.com/questions/65251195/how-to-change-z-index-of-components-in-react
  const passZIndex = (ref) => {
    incrementZIndex();
    ref.current.style.zIndex = zIndex;
    resetTopbarSelection();
    ref.current.className = "topbar selected-app";
  };

  // all applications to be displayed on the desktop, initial states
  const initialAppStates = [
    {
      id: "1",
      title: "My CV",
      icon: wordPadIcon,
      component: MyCV,
      style: { backgroundColor: "" },
    },
    {
      id: "2",
      title: "Photos",
      icon: photosIcon,
      component: <PhotoViewer/>,
      style: { backgroundColor: "" },
    },
    {
      id: "3",
      title: "Music",
      icon: wordPadIcon,
      component: <MusicPlayer/>,
      style: { backgroundColor: "" },
    },
    {
      id: "4",
      title: "GitHub",
      icon: githubIcon,
      component: "",
      style: { backgroundColor: "" },
    },
  ];

  const [applications, setApplications] = useState(initialAppStates);

  // reset currently selected element if exists
  const resetTopbarSelection = () => {
    if (Array.from(document.getElementsByClassName(" selected-app"))[0] !== undefined)
      document.getElementsByClassName(" selected-app")[0].className = "topbar";
  };

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
      if (openApps.includes(app[key])) {
        return summonApplication(app[key].id, true);
      }
      if (openApps.length <= 4) {
        setOpenApps((current) => [...current, app[key]]);
        appIconSelection(-1); // resets icon selection
      }
    }
  };

  // Function to launch given application within AppWindow component
  const launchApplication = (app) => {
    return (
      <AppWindow
        passZIndex={passZIndex}
        title={app.title}
        zIndex={zIndex}
        appId={app.id}
        contents={app.component}
      />
    );
  };

  // add an application to list
  const addApplication = (obj) => {
    setApplications((current) => [...current, obj]);
  };


  // Function for controlling app visibility from taskbar
  // Spaghetti-code for now. Optimize if-statements
  const summonApplication = (appId, isOpen) => {
    resetTopbarSelection();
    // Get selected div's style
    const divStyle = document.getElementsByClassName(
      "draggable-parent app-container applicationId: " + appId
    )[0].style;

    if (divStyle.display == "" && divStyle.zIndex == zIndex - 1) {
      if (divStyle.zIndex == zIndex - 1 && !isOpen) divStyle.display = "none";
      if (divStyle.zIndex != zIndex) {
        incrementZIndex();
        divStyle.zIndex = zIndex;
      }
    } else {
      incrementZIndex();
      divStyle.zIndex = zIndex;
      divStyle.display = "";
      divStyle.transform3d = 0;
      divStyle.left = 0;
    }
  };

  return (
    <div className="desktop-background noselect">
      <div className="parent">
        {applications.map((app, key, appComp) => (
          <div
            className={"app-grid " + app.id}
            onClick={(event) => handleClick(event, key, appComp)}
            key={key}
            app={app.component}
            style={app.style}
          >
            <AppIcon title={app.title} icon={app.icon}></AppIcon>
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
