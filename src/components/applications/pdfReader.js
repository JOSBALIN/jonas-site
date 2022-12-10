import "./pdfReader.css";
import { Document, Page, Outline } from "react-pdf/dist/esm/entry.webpack5";

import infoSecPDF from "./portfolio/MatrixMultiplication.pdf";
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

  function nextPage(){
    if(pageNumber < numPages)
        setPageNumber((pageNumber) => pageNumber + 1)
  }

  function previousPage(){
    if(pageNumber > 1)
    setPageNumber((pageNumber) => pageNumber - 1)
  }

  function zoomIn(){
    if(scale < 4)
    setScale((scale) => scale + 0.2)
  }

  function zoomOut(){
    if(scale > 0.2)
    setScale((scale) => scale - 0.2)
  }

  function rotateClockwise() {
    if (rotation === 270) {
      setRotation(0);
    } else {
      setRotation((rotation) => rotation + 90);
    }
  }

  function rotateCounterClockwise() {
    if (rotation === 0) {
      setRotation(270);
    } else {
      setRotation((rotation) => rotation - 90);
    }
  }

  const download = (file) => {
    return(
        <a href={file} target = "_blank">DOWNLOAD FILE</a>
    )
  }

  return (
    <div className="pdf-reader-background">
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="pdf-container">
      <Document file={props.document} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} scale={scale} rotate={rotation}/>
      </Document>
      </div>
      <button onClick={() => previousPage()}>
        {" "}
        PREVIOUS PAGE
      </button>
      <button onClick={() => nextPage()}>
        {" "}
        NEXT PAGE
      </button>
      <button onClick={() => zoomIn()}>
        {" "}
        ZOOM IN
      </button>
      <button onClick={() => zoomOut()}>
        {" "}
        ZOOM OUT
      </button>
      {download(props.document)}
      <button onClick={() => rotateClockwise()}>
        {" "}
        ROTATE CLOCKWISE
      </button>
      <button onClick={() => rotateClockwise()}>
        {" "}
        ROTATE COUNTERCLOCKWISE
      </button>
    </div>
  );
}
