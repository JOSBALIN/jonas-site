import "./startMenu.css";
import OutsideAlerter from "../hooks/OutsideAlerter";
import { useState } from "react";
import XPShutdownAudio from "./XP-Shutdown.mp3";
import XPShutDownBackground from "../../images/desktop-shutdown.png"

export default function StartMenu(props) {
  const [showShutdown, setShowShutdown] = useState(false);

  const centeredStyle = {
    position: 'absolute',
    top: 200,
    right: 0,
    left: 250,
    margin: 'auto'
  };

  const shutdownPC = () => {
    setShowShutdown(true);
    const audio = new Audio(XPShutdownAudio);
    audio.addEventListener("ended", () => {
      window.location.replace('')
    });
    audio.play();
  };

  return (
    <OutsideAlerter
      enabled={props.outsideClick}
      hideMenu={props.hideMenu}
      children={
        <div className={"start-menu"} style={props.style}>
          <img
            className="start-menu-img"
            src={require("../../images/desktop-start-menu-compact.png")}
          ></img>

          <div className="start-menu-button start-menu-app a01"></div>
          <div className="start-menu-button start-menu-app a02"></div>
          <div className="start-menu-button start-menu-app a03"></div>
          <div className="start-menu-button start-menu-app a04"></div>

          <div className="start-menu-button log-off"></div>
          <div
            className="start-menu-button turn-off-computer"
            onClick={shutdownPC}
          ></div>

          {showShutdown && (
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
              <img src={XPShutDownBackground} style={centeredStyle}/>
            </div>
          )}
        </div>
      }
    ></OutsideAlerter>
  );
}
