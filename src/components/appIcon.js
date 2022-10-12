import { useState } from "react";
import iconTest from "../images/app-icons/app-icon-wordpad.png";

export default function AppIcon(props) {
  const [title, setTitle] = useState(props.title);
  const [icon, setIcon] = useState(props.icon);
  const [selected, setSelected] = useState(false);

  return (
    <div className="app-icon">
      <div className="icon-img-overlay">
      <img className="icon-img" src={iconTest}></img>
      </div>
      <div className="app-tile-title">
        <p>{title} </p>
      </div>
    </div>
  );
}
