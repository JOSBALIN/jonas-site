import "./pdfReader.css";
import { Document, Page, Outline } from "react-pdf/dist/esm/entry.webpack5";
import zoomInIcon from "../../images/application-images/pdf-reader/zoom-in.png";
import zoomOutIcon from "../../images/application-images/pdf-reader/zoom-out.png";
import rotateClockwiseIcon from "../../images/application-images/pdf-reader/rotate-clockwise.png";
import rotateCounterClockwiseIcon from "../../images/application-images/pdf-reader/rotate-counterclockwise.png";
import rightArrowIcon from "../../images/application-images/pdf-reader/right-arrow.ico";
import leftArrowIcon from "../../images/application-images/pdf-reader/left-arrow.ico";
import downloadIcon from "../../images/application-images/pdf-reader/download.ico";
 
import { useState } from "react";

export default function PDFReader(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [openPDFs, setOpenPDFs] = useState([]);
  const [scale, setScale] = useState(0.8);
  const [scalePercent, setScalePercent] = useState(scale*100);
  const [rotation, setRotation] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  function changePage(direction, event){
    if(direction === "next" && pageNumber < numPages)  setPageNumber((pageNumber) => pageNumber + 1);
    if(direction === "previous" && pageNumber > 1)     setPageNumber((pageNumber) => pageNumber - 1);
    if(event != null && event.target.value <= numPages) setPageNumber(Number(event.target.value))
  }

  function zoom(direction) {
    if (direction === "in" && scale < 4) setScale((scale) => scale + 0.2);
    if (direction === "out" && scale > 0.2) setScale((scale) => scale - 0.2);
  }

  function zoomChange(event){
    setScale(event.target.value)
  }


  // Edge cases used to avoid console.logging errors for going below 0* or exceeding 360*
  function rotate(direction) {
    if (direction === "clockwise") {
      if (rotation === 270) {
        setRotation(0);
      } else {
        setRotation((rotation) => rotation + 90);
      }
    } else {
      if (rotation === 0) {
        setRotation(270);
      } else {
        setRotation((rotation) => rotation - 90);
      }
    }
  }

  const downloadButton = () => {
    return(
        <a href={props.document} target = "_blank"><img src={downloadIcon}/></a>
    )
  }

  
  const zoomButton = () => {
    return (
      <img src={zoomInIcon} onClick={() => zoom("in")}></img>
    )
  }

  function addPDF(document) {
    setOpenPDFs(openPDFs => [...openPDFs, document]);
  }


  return (
    <div className="pdf-reader-background">
      <div className="pdf-controls">
      {/* <input
        className="pdf-input"
        type="percent"
        value={scalePercent + "%"}
        onChange={(e) => zoomChange(e)}
      /> */}
        <img className="pdf-zoom" src={zoomOutIcon} onClick={() => zoom("out")}></img>
        <img className="pdf-zoom" src={zoomInIcon} onClick={() => zoom("in")}></img>
          <img
            src={leftArrowIcon}
            className="page-arrow"
            onClick={() => changePage("previous")}
          ></img>
          <input
            className="pdf-input"
            type="number"
            value={pageNumber}
            onChange={(e) => changePage("", e)}
          />
          /{numPages}
          <img
            src={rightArrowIcon}
            className="page-arrow"
            onClick={() => changePage("next")}
          ></img>
        {downloadButton()}
        <img className="pdf-rotate" src={rotateClockwiseIcon} onClick={() => rotate("clockwise")}></img>
        <img className="pdf-rotate" src={rotateCounterClockwiseIcon} onClick={() => rotate("counterclockwise")}></img>
      </div>
      <div className="pdf-container">
        <Document file={props.document} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            scale={scale}
            rotate={rotation}
          />
        </Document>
      </div>
    </div>
  );
}
