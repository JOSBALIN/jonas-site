import "./startMenu.css";
import OutsideAlerter from "../hooks/useOutsideAlerter";
import { useState, useRef, useEffect } from "react";
import XPShutdownAudio from "../../audio/audio-XP-Shutdown.mp3";
import XPShutDownBackground from "../../images/desktop-shutdown.png"
import React from "react";

export default function StartMenu(props) {
  const [shutdown, setShutdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const shutdownPC = () => {
    if(window.confirm("Are you sure you want to turn this PC off?")){
    setShutdown(true);
    const audio = new Audio(XPShutdownAudio);
    audio.addEventListener("ended", () => {
      window.location.replace('')
    });
    audio.play();
  }
  };

  const handleAppClick = (event, appId) => {
    props.launchApplication(event, appId)
  }


  return (
        <div className={"start-menu"} style={props.style}>
          <img
            className="start-menu-img"
            src={require("../../images/desktop-start-menu-compact.png")}
          ></img>

          {props.appList.map((app, index) => (
            <div
              key={app.id}
              className={"start-menu-button start-menu-app"}
              style={{ bottom: 482 - 54 * index }}
              onClick={(event) => handleAppClick(event, app.id)}
            >
              <img className="start-menu-app-icon" src={app.icon} />
              <p className="start-menu-app-title">{app.title}</p>
            </div>
          ))}

          <div className="start-menu-button log-off"></div>
          <div
            className="start-menu-button turn-off-computer"
            onClick={shutdownPC}
          ></div>

          {shutdown && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 200000,
                width: "100vw",
                height: "100vw",
                backgroundColor: "#5a7edc",
              }}
            >
              <img
                src={XPShutDownBackground}
                style={{
                  position: "absolute",
                  top: 200,
                  right: 0,
                  left: 250,
                  margin: "auto",
                }}
              />
            </div>
          )}
        </div>
  );
}
