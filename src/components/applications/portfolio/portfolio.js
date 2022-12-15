import "./portfolio.css";
import PDFReader from "../pdfReader";
import infoSecPDF from "./MatrixMultiplication.pdf";
import photosIcon from "../../../images/app-icons/app-icon-photos.png";
import expandMenu from "../../../images/application-images/portfolio/expand-menu.png";
import topBarImage from "../../../images/application-images/portfolio/portfolio-top-app-bar.png";
import { useState } from "react";
import { AppWindow } from "../../appWindow";
import PortfolioTextsMenu from "./portfolioTextsMenu";

export default function Portfolio(props) {
  const [displayedDocument, setDisplayedDocument] = useState();
  const mastersPortfolio = [
    {
      title: "Final Project: Matrix Multiplication",
      document: infoSecPDF,
      year: "2022"
    },
  ]

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

          <PortfolioTextsMenu PDFReader={summonPDFReader} portfolio={mastersPortfolio} title={"Master's"}/>

          {/* <PortfolioTextsMenu PDFReader={summonPDFReader} document={infoSecPDF} title={"Bachelor's"}/> */}

        </div>
      </div>
      <div className="portfolio-right-div">{displayedDocument}</div>
    </div>
  );
}
