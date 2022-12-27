import expandMenu from "../../../images/application-images/portfolio/expand-menu.png";
import { useState } from "react";

export default function PortfolioTextsMenu(props) {
  const [contentsHidden, setContentsHidden] = useState(false);
  const [portfolio, setPortfolio] = useState(props.portfolio);

  function changeHoverState(e) {
    const title = e.target.firstElementChild;
    const icon = e.target.lastElementChild;
    if (e.type == "mouseover") {
      icon.style.filter = "brightness(120%)";
      e.target.style.cursor = "pointer";
    } else {
      title.style.display = "";
      icon.style.display = "";
      title.style.filter = "brightness(100%)";
      icon.style.filter = "brightness(100%)";
    }
  }

  const handleClick = (selectedPDF) => {
    console.log(selectedPDF)
    props.selectionPDF(selectedPDF)
  }

  //(e) => changeHoverState(e)
  return (
    <div id="Masters" className="tabcontent">
      <div
        className="tabcontent-title"
        onMouseOver={(e) => changeHoverState(e)}
        onMouseLeave={(e) => changeHoverState(e)}
        onClick={() => setContentsHidden(!contentsHidden)}
      >
        <h2>{props.title}</h2>
        <img
          className="menu-control"
          src={expandMenu}
          style={
            contentsHidden
              ? { transform: "rotate(0deg)" }
              : { transform: "rotate(180deg)" }
          }
        ></img>
      </div>
      <div
        className="tabcontent-content"
        id="masters-content"
        style={contentsHidden ? { display: "none" } : { display: "" }}
      >
        <ul className="portfolio-list">
          {portfolio.map((subject, key) => (
            <li key={key} onClick={() => handleClick(subject)}>
              {subject.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
