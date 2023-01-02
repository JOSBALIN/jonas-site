import "./pdfReader.css";
import { Document, Page, Outline, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import zoomInIcon from "../../../images/application-images/pdf-reader/zoom-in.png";
import zoomOutIcon from "../../../images/application-images/pdf-reader/zoom-out.png";
import rotateClockwiseIcon from "../../../images/application-images/pdf-reader/rotate-clockwise.png";
import rotateCounterClockwiseIcon from "../../../images/application-images/pdf-reader/rotate-counterclockwise.png";
import rightArrowIcon from "../../../images/application-images/pdf-reader/right-arrow.ico";
import downloadIcon from "../../../images/application-images/pdf-reader/download.ico";

 
import { useState } from "react";

export default function PDFReader(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.8);
  const [rotation, setRotation] = useState(0);

  // Load document, reset page selection
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(direction) {
    if (direction === "next" && pageNumber < numPages)
      setPageNumber((pageNumber) => pageNumber + 1);
    if (direction === "previous" && pageNumber > 1)
      setPageNumber((pageNumber) => pageNumber - 1);
  }

  function zoom(direction) {
    if (direction === "in" && scale < 4) setScale((scale) => scale + 0.2);
    if (direction === "out" && scale > 0.2) setScale((scale) => scale - 0.2);
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
    return (
      <a href={props.document} target="_blank">
        <img
          src={downloadIcon}
          onClick={() =>
            window.confirm("Are you sure you want to download this file?")
          }
        />
      </a>
    );
  };

  // If props.selfContained === true, the pdfReader will generate an output with buttons right next to it, to be implemented in any appWindow.
  // If false, it will assume it's being used in the portfolio app and will generate buttons that fit within that app's top-bar
  const output = () => {
    if (props.selfContained) {
      return (
        <div className="pdf-controls">
          <div className="nextPage"></div>
          <img
            className="pdf-zoom"
            src={zoomOutIcon}
            onClick={() => zoom("out")}
          />
          <img
            className="pdf-zoom"
            src={zoomInIcon}
            onClick={() => zoom("in")}
          />
          <img
            src={rightArrowIcon}
            style={{ transform: "rotate(180deg)" }}
            className="page-arrow"
            onClick={() => changePage("previous")}
          />
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
          />
          {downloadButton()}
          <img
            className="pdf-rotate"
            src={rotateClockwiseIcon}
            onClick={() => rotate("clockwise")}
          />
          <img
            className="pdf-rotate"
            src={rotateCounterClockwiseIcon}
            onClick={() => rotate("counterclockwise")}
          />
        </div>
      );
    } else {
      return (
        <div className="embedded-pdf-elements">
          <div
            id="embedded-previous-page"
            onClick={() => changePage("previous")}
          />
          <div id="embedded-next-page" onClick={() => changePage("next")}/>
          <p id="embedded-page-number">
            {" "}
            {pageNumber}/{numPages}
          </p>
          <div id="embedded-zoom-in" onClick={() => zoom("in")}/>
          <div id="embedded-zoom-out" onClick={() => zoom("out")}/>
          {downloadButton}
          <div id="embedded-file-title">
            <p>
            C:\Document and Settings\JonasBalin\Documents\Portfolio\{props.title}
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="total-background">
      {output()}
      <div className="pdf-reader-background">
        <div className="pdf-container"> 
          <Document file={props.document} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              scale={scale}
              rotate={rotation}
              />
          </Document>
        </div>
      </div>
    </div>
  );
}
