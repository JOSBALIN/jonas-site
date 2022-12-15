import "./pdfReader.css";
import { Document, Page, Outline } from "react-pdf/dist/esm/entry.webpack5";
import zoomInIcon from "../../images/application-images/pdf-reader/zoom-in.png";
import zoomOutIcon from "../../images/application-images/pdf-reader/zoom-out.png";
import rotateClockwiseIcon from "../../images/application-images/pdf-reader/rotate-clockwise.png";
import rotateCounterClockwiseIcon from "../../images/application-images/pdf-reader/rotate-counterclockwise.png";
import rightArrowIcon from "../../images/application-images/pdf-reader/right-arrow.ico";
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
        <a href={props.document} target = "_blank"><img src={downloadIcon} onClick={() => window.confirm("Are you sure you want to download this file?")}/></a>
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

  const output = () => {
    console.log(props.selfContained)
    if(props.selfContained){
      return(

        <div className="pdf-controls">
        <div className="nextPage"></div>
        <img className="pdf-zoom" src={zoomOutIcon} onClick={() => zoom("out")}></img>
        <img className="pdf-zoom" src={zoomInIcon} onClick={() => zoom("in")}></img>
          <img
            src={rightArrowIcon}
            style={{transform:"rotate(180deg)"}}
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
      )
    } else {
      return (
        <div className="embedded-pdf-elements">
        <div id="embedded-previous-page" onClick={() => changePage("previous")}></div>
        <div id="embedded-next-page" onClick={() => changePage("next")}></div>
        <p id="embedded-page-number"> {pageNumber}/{numPages}</p>
        <div id="embedded-zoom-in" onClick={() => zoom("in")}></div>
        <div id="embedded-zoom-out" onClick={() => zoom("out")}></div>
        <div id="embedded-file-title"><p>C:\Document and Settings\JonasBalin\Documents\Portfolio\{props.title}</p></div>
        </div>
      )
    }
  }


  return (
    <div className="pdf-reader-background">
      {output()}
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
