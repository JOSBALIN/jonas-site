import "../App.css";
import * as React from "react";
import Taskbar from "./taskbar/taskbar";
import { AppWindow } from "./appWindow";
import "./appWindow.css";
import "./desktop.css";
import { useState } from "react";
import AppIcon from "./appIcon";
import { useEffect } from "react";
import MyCV from "./applications/myCV";
import PhotoViewer from "./applications/photoViewer";
import wordPadIcon from "../images/app-icons/app-icon-wordpad.ico";
import photosIcon from "../images/app-icons/app-icon-photos.ico";
import githubIcon from "../images/app-icons/app-icon-github.png";
import MusicPlayer from "./applications/musicPlayer";
import References from "./applications/references";
import Contact from "./applications/contact";
import contactIcon from "../images/app-icons/app-icon-contact.png";
import referencesIcon from "../images/app-icons/app-icon-references.ico";
import Portfolio from "./applications/portfolio/portfolio";
import PdfReader from "./applications/pdfReader";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import matrixMultiplicationPDF from './applications/portfolio/MatrixMultiplication.pdf';


export default function Desktop() {
  // List of open apps to control taskbar icons
  const [openApps, setOpenApps] = useState([]);
  const [zIndex, setZIndex] = useState(1);
  const [appGridClasses, setAppGridClasses] = useState([]);
  const [newApp, setNewApp] = useState(false);
  const [closedAppsTaskbars, setClosedAppsTaskbars] = useState([])


  // Get all instances of classes titled app-grid
  useEffect(() => {
    setAppGridClasses(Array.from(document.getElementsByClassName("app-grid")));
  }, []);

  useEffect(() => {
    setOpenApps(
      openApps.map((obj, index) => ({
        ...obj,
        elementApp: document.getElementById("applicationId:" + obj.id),
        elementTaskbar: document.getElementById("taskbar-app-id-" + obj.id),
        elementTopbar: document.getElementById("applicationId:" + obj.id).firstChild.firstChild,
      }))
    );
  }, [newApp]);




  // Handling of z-index and app selection status coloring
  // Functional but could use refinement
  const passZIndex = (appId) => {
    const selectedStyle = "filter:grayscale(0%);"
    const deselectedStyle = "filter:grayscale(70%);"

    setZIndex((zIndex) => zIndex + 1);

    // Deselect currently selected app, apply styles
    const deselectedApp = openApps.find(current => current.selected === true)
    deselectedApp.elementTaskbar.style = deselectedStyle
    deselectedApp.elementTopbar.style = deselectedStyle
    deselectedApp.selected = false;
    
    // Create new selected app, apply styles
    //const appId = ref.current.parentElement.parentElement.id.charAt(ref.current.parentElement.parentElement.id.length-1)
    const selectedApp = openApps.find(current => current.id === appId)

    selectedApp.elementTaskbar.style = selectedStyle
    selectedApp.elementTopbar.style = selectedStyle
    selectedApp.elementApp.style.zIndex = zIndex
    selectedApp.selected = true;
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
        windowDimensions={app.windowDimensions}/>
    );
  };

  // all applications to be displayed on the desktop, initial states
  // future refactor - place these in external file
  const initialAppStates = [
    {
      id: 1,
      title: "My CV",
      icon: wordPadIcon,
      component: <MyCV/>,
      windowDimensions:{
        height: "90%",
        width: "50%",
      },
    },
    {
      id: 2,
      title: "Photos",
      icon: photosIcon,
      component: <PhotoViewer/>,
      windowDimensions:{
        height: "60%",
        width: "40%",
      },
    },
    // {
    //   id: "3",
    //   title: "Music",
    //   icon: wordPadIcon,
    //   component: <MusicPlayer/>,
    // },
    {
      id: 3,
      title: "References",
      icon: referencesIcon,
      component: <References/>,
      windowDimensions:{
        height: "450px",
        width: "1000px",
        resize:"horizontal",
      },
    },
    {
      id: 4,
      title: "Mail",
      icon: contactIcon,
      component: <Contact/>,
      windowDimensions:{
        height: "70%",
        width: "50%",
      },
    },
    {
      id: 5,
      title: "Portfolio",
      icon: photosIcon,
      component: <Portfolio/>,
      windowDimensions:{
        height: "30%",
        width: "50%",
      },
    },
    {
      id: 6,
      title: "PDFTest",
      icon: photosIcon,
      component: <PdfReader document={matrixMultiplicationPDF} title={"Matrix Multiplication"}/>,
      windowDimensions:{
        height: "80%",
        width: "50%",
        resize:"none",
      },
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

  const closeApp = (appId) =>  {
    // Remove app-container

    document.getElementById("applicationId:"+appId).style.display = "none"
    const taskbarToRemove = document.getElementById("taskbar-app-id-"+appId).parentElement.parentElement

    taskbarToRemove.style.display = "none"
    console.log(taskbarToRemove)
    console.log(appId)

    // Re-arrange taskbar
    for (let i = Number(taskbarToRemove.id.slice(-1))+1; i <= openApps.length; i++) {
      if(document.getElementById("taskbar-app-div-"+i)) document.getElementById("taskbar-app-div-"+i).id = "taskbar-app-div-"+(i-1)
      } 

      taskbarToRemove.id = "hidden-taskbar-app-div"+appId
  }

  // single-click, color app-icon. Double-click, launch app
  const handleClick = (event, key, app) => {
    appIconSelection(key);

    // Execute on double click
    if (event.detail === 2) {
      // Check if app is open
      if (openApps.some(current => current.id === app[key].id)) {
        return summonApplication(app[key].id);
      } else {

        setOpenApps((current) => [
          ...current,
          {
            component: app[key].component,
            id: app[key].id,
            title: app[key].title,
            icon: app[key].icon,
            windowDimensions: app[key].windowDimensions,
            selected:true
          },
        ]);
        appIconSelection(-1); // resets icon selection
        setNewApp(!newApp) // needed to update HTML elements in openApps arr
      }
    }
  };


  

    const summonApplication = (appId) => {
      const selectedApp = openApps.find(current => current.id === appId)
      
      // Hide selected app
      if(selectedApp.selected && selectedApp.elementApp.style.display == ""){
        selectedApp.elementApp.style.display = "none"
        selectedApp.elementTaskbar.style = "filter:grayscale(70%);"
      }
      else // Summon selected app 
       {
        selectedApp.elementApp.style.display = ""
        passZIndex(appId)
        console.log(selectedApp.elementTaskbar.parentElement.parentElement.style.display == "none")
        if(selectedApp.elementTaskbar.parentElement.parentElement.style.display == "none"){
          for (let i = openApps.length; i > 0; i--) {
            console.log(i);
            if(document.getElementById("taskbar-app-div-"+i)) {
              selectedApp.elementTaskbar.parentElement.parentElement.style.display = ""
              selectedApp.elementTaskbar.parentElement.parentElement.id = "taskbar-app-div-"+(i+1)
              break;
            }
          }
        }
      }
    };

  // add an application to list
  const addApplication = (obj) => {
    setApplications((current) => [...current, obj]);
  };


  return (
    <div className="desktop-background noselect" id="desktop-background">
      <div className="parent">
        {applications.map((app, key, appComp) => (
          <div
            className={"app-grid " + app.id}
            onClick={(event) => handleClick(event, key, appComp)}
            key={key}
            app={app.component}
          >
            <AppIcon title={app.title} icon={app.icon}></AppIcon>
          </div>
        ))}
        {openApps.map((app, key) => (
          <div key={key}>{launchApplication(app)}</div>
        ))}
      </div>
      <div className="desktop-frontlayer">
        <Taskbar
          className="taskbar"
          openApps={openApps}
          summonApplication={summonApplication}
        />
      </div>
      <button onClick={ ()=> closeApp(1)}>CLICKTOTEST</button>
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
