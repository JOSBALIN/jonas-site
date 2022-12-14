import "./portfolio.css";
import PDFReader from "../pdfReader";
import infoSecPDF from "./MatrixMultiplication.pdf";
import photosIcon from "../../../images/app-icons/app-icon-photos.png";
import { useState } from "react";
import { AppWindow } from "../../appWindow";

export default function Portfolio(props) {
  const [displayedDocument, setDisplayedDocument] = useState();

  function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    } // Show the current tab, and add an "active" class to the button that opened the tab

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  const changePDFReader = () => {
    setDisplayedDocument(<PDFReader document={infoSecPDF} title={"aaaa"} />);
  };

  return (
    <div className="portfolio-background">
      <div className="portfolio-left-div">
        <div className="portfolio-choice">
          <div class="tab">
            <button
              class="tablinks active"
              onClick={(e) => openTab(e, `Masters`)}
            >
              Master's
            </button>
            <button class="tablinks" onClick={(e) => openTab(e, `Bachelors`)}>
              Bachelor's
            </button>
          </div>

          <div id="Masters" class="tabcontent" style={{ display: "block" }}>
            <div className="tabcontent-title">
              <h2>Master's</h2>
            </div>
            <button onClick={() => changePDFReader()}>TEST ME</button>
            <h3>Master of IT, Software Design, IT University of Copenhagen</h3>
            <ul className="portfolio-list">
              <li>
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

          <div id="Bachelors" class="tabcontent">
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
