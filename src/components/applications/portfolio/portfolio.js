import "./portfolio.css";
import PDFReader from "./pdfReader";
import photosIcon from "../../../images/app-icons/app-icon-photos.png";
import lockedIcon from "../../../images/application-images/portfolio/locked.ico";
import expandMenu from "../../../images/application-images/portfolio/expand-menu.png";
import topBarImage from "../../../images/application-images/portfolio/portfolio-top-app-bar.png";
import { useState, useEffect } from "react";
import { AppWindow } from "../../appWindow";
import PortfolioTextsMenu from "./portfolioTextsMenu";
import matMul from "../../../portfolio-appendix/MatrixMultiplication.pdf";
import infoSecPDF from "../../../portfolio-appendix/Video Game Information Security and RCE In Source Engine Games.pdf";
import mastersThesis from "../../../portfolio-appendix/VR Multimedia Analytics Softare Usability.pdf";
import technicalExam from "../../../portfolio-appendix/Technical Interaction Design Final Report.pdf"
import researchProject from "../../../portfolio-appendix/Improvements to the usability of PhotoCube.pdf"
import bachelorPDF from "../../../portfolio-appendix/bachelorPDF.pdf"

export default function Portfolio() {
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [currentTextData, setCurrentTextData] = useState({
    title: "VR Multimedia Analytics Software Usability: Implementing and Assessing Novel Application Features in ViRMA",
    description: "Katarzyna Toborek and I designed, implemented, and evaluated a number of changes to a VR multimedia database software with the intent of improving the usability of the software. To this end, we ported the software (ViRMA) from SteamVR to OculusVR and implemented a number of proprietary features such as pass-through technology, hand-tracking and keyboard implementation. The work was conducted in Unity, written in C#. We received top marks for our work and presentation.",
    year: "2022",
    course: "Master's thesis"
  })
  const [displayedDocument, setDisplayedDocument] = useState(
    <PDFReader
      document={mastersThesis}
      selfContained={false}
      title={"VR Multimedia Analytics Software Usability: Implementing and Assessing Novel Application Features in ViRMA"}
    />
  );
  const mastersPortfolio = [
    {
      title: "VR Multimedia Analytics Software Usability: Implementing and Assessing Novel Application Features in ViRMA",
      document: mastersThesis,
      year: "2022",
      course: "Master's thesis",
      ects: "30",
      description: "Katarzyna Toborek and I designed, implemented, and evaluated a number of changes to a VR multimedia database software with the intent of improving the usability of the software. To this end, we ported the software (ViRMA) from SteamVR to OculusVR and implemented a number of proprietary features such as pass-through technology, hand-tracking and keyboard implementation. The work was conducted in Unity, written in C#. We received top marks for our work and presentation."
    },
    {
      title: "Video Game Information Security and RCE in Source Engine Games",
      document: infoSecPDF,
      year: "2022",
      course: "Applied Information Security",
      ects: "7.5",
      description: "As part of the Applied Information Security course, I presented a case study of video game information security. In this case study, I examined both typical video game related security vulnerabilities, along with a specific case of remote code execution (RCE) achieved in the popular Source Engine."
    },
    {
      title: "Research Project",
      document: researchProject,
      year: "2021",
      course: "Research Project",
      ects: "7.5",
      description: "As part of the Master's in Software Design, a research project is undertaken in preparation for the Master's thesis. My partner, Katarzyna Toborek, and my thesis revolved around a VR implementation of a multimedia database. The purpose of our research project was to familiarize us with the multimedia database (theoretically and in practice), by having us improve the usability of the existing web-client."
    },
    {
      title: "Matrix Multiplication",
      document: matMul,
      year: "2022",
      course: "Applied Algorithms",
      ects: "7.5",
      description: "This paper solves tasks regarding implementation and testing of different matrix multiplication algorithms, along with examining differences in speed and space complexity."
    },
    {
      title: "Technical Interaction Design",
      document: technicalExam,
      year: "2022",
      course: "Technical Interaction Design",
      ects: "7.5",
      description: "This paper presents the result of a longer design process based on a given case. This resulted in a rudimentary implementation of the proposed design, written in ReactJS."
    },
    {
      title: "Master's diploma",
      document: mastersThesis,
      year: "2022",
      locked: true,
    },
  ];

  const bachelorsPortfolio = [
    {
      title: "Quick draws, Duels, and Tombstones: Exploring the intermediality of Red Dead Redemption 2 and the ludic Western",
      document: bachelorPDF,
      year: "2019",
      course: "Bachelor's thesis",
      ects: "15",
      description: "This paper explores the intermediality of the Western genre in relation to the video game medium, using Red Dead Redemption 2 as a case study."
    
    },
    {
      title: "Bachelor's diploma",
      document: "",
      year: "2019",
      locked:true
    },
  ];

    // Detect whether device is phone or PC
    const [device, setDevice] = useState(null);
    const [alerted, setAlerted] = useState(false);
  
    useEffect(() => {
      const userAgent = navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        setDevice('phone');
      } else {
        setDevice('pc');
      }
    }, []);
  
    if(!alerted && device === "phone"){
      window.alert("NB. the portfolio app is not compatible with most mobile devices yet!")
      setAlerted(true)
    }

  const summonPDFReader = (document) => {
    setDisplayedDocument(
      <PDFReader document={document} selfContained={false}  />
    );
  };

  const selectionPDF = (data) => {
    console.log(data)
    if (data.locked) {
      setShowLockedModal(true);
      return;
    }
    setDisplayedDocument(
      <PDFReader
        document={data.document}
        title={data.title}
        year={data.year}
        selfContained={false}
        description={data.description}
      />
    );
    setCurrentTextData({
      title:data.title,
      description:data.description,
      year: data.year,
      course:data.course,
    })
  };

  return (
    <div className="portfolio-container">
      {showLockedModal ? <div className="background-hidden"></div> : ""}
      <div className="portfolio-top-menu" id="taskbar">
        <img className="top-menu-img" src={topBarImage}></img>
      </div>
      <div className="portfolio-background">
        <div className="portfolio-left-div">
          <div className="portfolio-choice">
            <PortfolioTextsMenu
              PDFReader={summonPDFReader}
              portfolio={mastersPortfolio}
              title={"Master's"}
              selectionPDF={selectionPDF}
            />
                        <PortfolioTextsMenu
              PDFReader={summonPDFReader}
              portfolio={bachelorsPortfolio}
              title={"Bachelor's"}
              selectionPDF={selectionPDF}
            />
          </div>
          <div className="tabcontent">
          <div className="tabcontent-title"><h2>Details</h2></div>
            <div className="tabcontent-details">
            <h3>{currentTextData.title}</h3>
          <p>
          <strong>Description:</strong> {currentTextData.description}<br/>
          <strong>Course:</strong> {currentTextData.course}<br/>
          <strong>Year:</strong> {currentTextData.year}<br/>
          </p>
          </div>
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
              <button
                className="dialog-box-button"
                onClick={() => setShowLockedModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
