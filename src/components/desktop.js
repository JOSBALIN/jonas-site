import "../App.css";
import * as React from "react";
import Taskbar from "./taskbar/taskbar";
import AppWindow from "./appWindow";
import "./appWindow.css";
import "./desktop.css";
import { useState } from "react";
import AppIcon from "./appIcon";
import { useEffect } from "react";
import MyCV from "./applications/myCV";
import PhotoViewer from "./applications/photoViewer";
import wordPadIcon from "../images/app-icons/app-icon-wordpad.ico";
import photosIcon from "../images/app-icons/app-icon-photos.ico";
import References from "./applications/references";
import Contact from "./applications/contact.tsx";
import contactIcon from "../images/app-icons/app-icon-contact.png";
import referencesIcon from "../images/app-icons/app-icon-references.ico";
import Portfolio from "./applications/portfolio/portfolio";


export default function Desktop() {
  const [openApps, setOpenApps] = useState([]);
  const [zIndex, setZIndex] = useState(1);
  const [appGridClasses, setAppGridClasses] = useState();



  // Get all instances of classes titled app-grid
  useEffect(() => {
    setAppGridClasses(Array.from(document.getElementsByClassName("app-grid")));
  }, []);
  

  // Handling of z-index and app selection status coloring
  const passZIndex = (appId) => {
    setZIndex((zIndex) => zIndex + 1);
    openApps.map((current) => (current.isSelected = false));
    const selectedApp = openApps.find((current) => current.id === appId);
    selectedApp.isSelected = true;
    selectedApp.zIndex = zIndex;
    console.log(selectedApp)
  };

  // Function to launch given application within AppWindow component
  const launchApplication = (app) => {
    return (
      <AppWindow
        passZIndex={passZIndex}
        closeApp={closeApp}
        title={app.title}
        zIndex={zIndex}
        appId={app.id}
        icon={app.icon}
        contents={app.component}
        windowDimensions={app.windowDimensions}
        isSelected={app.isSelected}
        display={""}
        />
    );
  };

  // all applications to be displayed on the desktop, initial states
  // future refactor - place these in external file
  const appList = [
    {
      id: 0,
      title: "MyCV.doc",
      icon: wordPadIcon,
      component: <MyCV/>,
      windowDimensions:{
        height: "90%",
        width: "50%",
      },
    },
    {
      id: 1,
      title: "My Photos",
      icon: photosIcon,
      component: <PhotoViewer/>,
      windowDimensions:{
        height: "60%",
        width: "40%",
      },
    },
    {
      id: 2,
      title: "My References",
      icon: referencesIcon,
      component: <References/>,
      windowDimensions:{
        height: "450px",
        width: "1000px",
        resize:"horizontal",
      },
    },
    {
      id: 3,
      title: "Mail Me",
      icon: contactIcon,
      component: <Contact/>,
      windowDimensions:{
        height: "70%",
        width: "50%",
      },
    },
    {
      id: 4,
      title: "Portfolio",
      icon: photosIcon,
      component: <Portfolio/>,
      windowDimensions:{
        height: "30%",
        width: "50%",
      },
    },
  ];


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

  function closeApp(appId)  {
    setOpenApps(list => list.filter(app => app.id !== appId ))
  }

  // single-click, color app-icon. Double-click, launch app
  const handleClick = (event, appId) => {
    appIconSelection(appId-1);

    // Execute on double click
    if (event.detail === 2 || event.target.className.includes("start-menu")) {
      // Check if app is open
      if (openApps.find(current => current.id === appList[appId].id)) {
        return summonApplication(appList[appId]);
      } else {

        setOpenApps((current) => [
          ...current,
          {
            component: appList[appId].component,
            id: appList[appId].id,
            title: appList[appId].title,
            icon: appList[appId].icon,
            windowDimensions: appList[appId].windowDimensions,
          },
        ]);
        appIconSelection(-1); // resets icon selection
      }
    }
  };

    const summonApplication = (app) => {
      if (app.isSelected) {
      } else {
        passZIndex(app.id);
      }
    };
    
  return (
    <div className="desktop-background noselect" id="desktop-background">
      <div className="parent">
        {appList.map((app, key, appComp) => (
          <div
            className={"app-grid " + app.id}
            onClick={(event) => handleClick(event, app.id)}
            key={key}
            app={app.component}
          >
            <AppIcon title={app.title} icon={app.icon}></AppIcon>
          </div>
        ))}
        {openApps.map((app) => (
          <div key={app.id}>{launchApplication(app)}</div>
        ))}
      </div>
      <div className="desktop-frontlayer">
        <Taskbar
          className="taskbar"
          openApps={openApps}
          appList={appList}
          launchApplication={handleClick}
          summonApplication={summonApplication}
        />
      </div>
    </div>
  );
}
