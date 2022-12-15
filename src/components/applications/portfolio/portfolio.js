import "./portfolio.css";
import PDFReader from "../pdfReader";
import photosIcon from "../../../images/app-icons/app-icon-photos.png";
import expandMenu from "../../../images/application-images/portfolio/expand-menu.png";
import topBarImage from "../../../images/application-images/portfolio/portfolio-top-app-bar.png";
import { useState } from "react";
import { AppWindow } from "../../appWindow";
import PortfolioTextsMenu from "./portfolioTextsMenu";
import matMul from "./MatrixMultiplication.pdf"

export default function Portfolio() {
  const [displayedDocument, setDisplayedDocument] = useState(<PDFReader document={matMul} selfContained={false} title={"ElemMatMul.pdf"} />);
  const mastersPortfolio = [
    {
      title: "Final Project: Matrix Multiplication",
      document: matMul,
      year: "2022"
    },
  ]

  const summonPDFReader = (document) => {
    setDisplayedDocument(<PDFReader document={document} selfContained={false} />);
  };

  return (
    <div className="portfolio-container">
    <div className="portfolio-top-menu" id="taskbar">      <img className="top-menu-img" src={topBarImage}></img></div>
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

          <PortfolioTextsMenu PDFReader={summonPDFReader} portfolio={mastersPortfolio} title={"Master's"}/>
          <PortfolioTextsMenu PDFReader={summonPDFReader} portfolio={mastersPortfolio} title={"Bachelor's"}/>

          {/* <PortfolioTextsMenu PDFReader={summonPDFReader} document={infoSecPDF} title={"Bachelor's"}/> */}

        </div>
      </div>
      <div className="portfolio-right-div">{displayedDocument}</div>
    </div>
    </div>
  );
}
