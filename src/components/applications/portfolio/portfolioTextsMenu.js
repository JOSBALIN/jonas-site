import expandMenu from "../../../images/application-images/portfolio/expand-menu.png";
import { useState } from "react";

export default function PortfolioTextsMenu(props) {
  const [contentsHidden, setContentsHidden] = useState(false);
  const [portfolio, setPortfolio] = useState(props.portfolio);

  function changeHoverState(e) {
    const title = e.target.firstElementChild;
    const icon = e.target.lastElementChild;
    if (e.type == "mouseover") {
      title.style.filter = "brightness(160%)";
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
          {/* <li onClick={() => props.PDFReader(props.document)}>
            2022: Master's Thesis - VR Multimedia Analytics Software Usability:
            Implementing and Assessing Novel Application Features in ViRMA
          </li> */}
          {/* <li>
            <a target="_blank">
              2022: Applied Information Security - Video Game Information
              Security and RCE In Source Engine Games
            </a>
          </li>
          <li>2022: Technical Interaction Design, Final Report</li>
          <li>
            2021: Applied Algorithms - Final Project: Matrix Multiplication
          </li>
          <li>
            2021: Research Project: Improvements to the usability of the
            Web-Based implementation of PhotoCube
          </li> */}
        </ul>
      </div>
    </div>
  );
}
