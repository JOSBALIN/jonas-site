import "./portfolio.css";
import PDFReader from "../pdfReader";
import infoSecPDF from "./MatrixMultiplication.pdf";
import photosIcon from "../../../images/app-icons/app-icon-photos.png";
import expandMenu from "../../../images/application-images/portfolio/expand-menu.png";
import { useState } from "react";
import { AppWindow } from "../../appWindow";

export default function Portfolio(props) {
  const [displayedDocument, setDisplayedDocument] = useState();



  const summonPDFReader = () => {
    setDisplayedDocument(<PDFReader document={infoSecPDF} title={"aaaa"} />);
  };

  return (
    <div className="portfolio-background">
      <div className="portfolio-left-div">
        <div className="portfolio-choice">
          {/* <div className="tab">
            <button
              className="tablinks active"
              onClick={(e) => openTab(e, `Masters`)}
            >
              Master's
            </button>
            <button className="tablinks" onClick={(e) => openTab(e, `Bachelors`)}>
              Bachelor's
            </button>
          </div> */}

          <div id="Masters" className="tabcontent">
            <div className="tabcontent-title" onClick={""}>
              <h2>Master's</h2>
              <img className="menu-control" src={expandMenu}></img>
            </div>
            <div className="tabcontent-content" id="masters-content">
            <ul className="portfolio-list">
              <li onClick={() => summonPDFReader(infoSecPDF)}>
                2022: Master's Thesis - VR Multimedia Analytics Software
                Usability: Implementing and Assessing Novel Application Features
                in ViRMA
              </li>
              <li>
                <a href={infoSecPDF} target="_blank">
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
              </li>
            </ul>
            </div>
          </div>

          <div id="Bachelors" className="tabcontent">
          <div className="tabcontent-title">
              <h2>Bachelor's</h2>
            </div>
            <p>Paris is the capital of France.</p>
          </div>
        </div>
      </div>
      <div className="portfolio-right-div">{displayedDocument}</div>
    </div>
  );
}
