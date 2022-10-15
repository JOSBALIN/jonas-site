import "./startMenu.css";
import OutsideAlerter from "./hooks/OutsideAlerter";
import { useState } from "react";

export default function StartMenu(props) {
  const [enabled, setEnabled] = useState(props.outsideClick);

  return (
    <OutsideAlerter
      enabled={props.outsideClick}
      hideMenu={props.hideMenu}
      children={
        <div className={"start-menu-background"} style={props.style}>
          <img
            className="invisible-image"
            src={require("../images/desktop-start-menu-compact.png")}
          ></img>

          <div className="start-menu-button start-menu-app a01"></div>
          <div className="start-menu-button start-menu-app a02"></div>
          <div className="start-menu-button start-menu-app a03"></div>
          <div className="start-menu-button start-menu-app a04"></div>

          <div className="start-menu-button log-off"></div>
          <div className="start-menu-button turn-off-computer"></div>
        </div>
      }
    ></OutsideAlerter>
  );
}
