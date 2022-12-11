import "./pdfReader.css";
import { Document, Page, Outline } from "react-pdf/dist/esm/entry.webpack5";

import { useState } from "react";

export default function PDFReader(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [openPDFs, setOpenPDFs] = useState([]);
  const [scale, setScale] = useState(0.8);
  const [rotation, setRotation] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  function changePage(direction){
    if(direction === "next" && pageNumber < numPages)  setPageNumber((pageNumber) => pageNumber + 1)
    if(direction === "previous" && pageNumber > 1)     setPageNumber((pageNumber) => pageNumber - 1)
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

  const download = (file) => {
    return(
        <button><a href={file} target = "_blank">DOWNLOAD FILE</a></button>
    )
  }

  function addPDF(document) {
    setOpenPDFs(openPDFs => [...openPDFs, document]);
  }

  return (
    <div className="pdf-reader-background">
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="pdf-controls">
      <button onClick={() => changePage("previous")}>
        {" "}
        PREVIOUS PAGE
      </button>
      <button onClick={() => changePage("next")}>
        {" "}
        NEXT PAGE
      </button>
      <button onClick={() => zoom("in")}>
        {" "}
        ZOOM IN
      </button>
      <button onClick={() => zoom("out")}>
        {" "}
        ZOOM OUT
      </button>
      {download(props.document)}
      <button onClick={() => rotate("clockwise")}>
        {" "}
        ROTATE CLOCKWISE
      </button>
      <button onClick={() => rotate()}>
        {" "}
        ROTATE COUNTERCLOCKWISE
      </button>
      </div>
      <div className="pdf-container">
      <Document file={props.document} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} scale={scale} rotate={rotation}/>
      </Document>
      </div>
    </div>
  );
}
