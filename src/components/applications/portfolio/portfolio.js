import "./portfolio.css";
import PDFReader from "../pdfReader";
import photosIcon from "../../../images/app-icons/app-icon-photos.png";
import lockedIcon from "../../../images/application-images/portfolio/locked.ico";
import expandMenu from "../../../images/application-images/portfolio/expand-menu.png";
import topBarImage from "../../../images/application-images/portfolio/portfolio-top-app-bar.png";
import { useState } from "react";
import { AppWindow } from "../../appWindow";
import PortfolioTextsMenu from "./portfolioTextsMenu";
import matMul from "./MatrixMultiplication.pdf"
import infoSecPDF from "./Video Game Information Security and RCE In Source Engine Games.pdf"
import mastersThesis from "./VR Multimedia Analytics Softare Usability.pdf"

export default function Portfolio() {
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [displayedDocument, setDisplayedDocument] = useState(
    <PDFReader
      document={matMul}
      selfContained={false}
      title={"ElemMatMul.pdf"}
    />
  );
  const mastersPortfolio = [
    {
      title: "InfoSec",
      document: infoSecPDF,
      year: "2022",
    },
    {
      title: "Final Project: Matrix Multiplication",
      document: matMul,
      year: "2022",
    },
    {
      title: "Master's thesis",
      document: mastersThesis,
      year: "2022",
    },
    {
      title: "Master's diploma",
      document: mastersThesis,
      year: "2022",
      locked: true
    },
  ];

  const summonPDFReader = (document) => {
    setDisplayedDocument(
      <PDFReader document={document} selfContained={false}/>
    );
  };

  const selectionPDF = (data) => {
    if(data.locked){
      setShowLockedModal(true)
      return;
    }
    setDisplayedDocument(
      <PDFReader document={data.document} title={data.title} year={data.year} selfContained={false}/>
    )
  }

  return (
    <div className="portfolio-container">
      {showLockedModal ?           <div className="background-hidden"></div> : ""}
      <div className="portfolio-top-menu" id="taskbar">
        <img className="top-menu-img" src={topBarImage}></img>
      </div>
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

            <PortfolioTextsMenu
              PDFReader={summonPDFReader}
              portfolio={mastersPortfolio}
              title={"Master's"}
              selectionPDF={selectionPDF}
            />
            <PortfolioTextsMenu
              PDFReader={summonPDFReader}
              portfolio={mastersPortfolio}
              title={"Bachelor's"}
              selectionPDF={selectionPDF}
            />

            {/* <PortfolioTextsMenu PDFReader={summonPDFReader} document={infoSecPDF} title={"Bachelor's"}/> */}
          </div>
        </div>
        <div className="portfolio-right-div">{displayedDocument}</div>
      </div>
      {showLockedModal ? (
        <div className="dialog-box">
          <div className="dialog-box-title-bar">LOCKED</div>
          <div className="dialog-box-content">
            Please enter the password to proceed!
            <img className="dialog-box-lock" src={lockedIcon}></img>
            <input type="password"></input>
            <div className="dialog-box-buttons ">
              <button className="dialog-box-button">Submit</button>
            <button className="dialog-box-button" onClick={() => setShowLockedModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
