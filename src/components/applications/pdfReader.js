import "./pdfReader.css"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import infoSecPDF from './portfolio/MatrixMultiplication.pdf';
import { useState } from "react";

export default function pdfReader(props) {
    

   
    return(
        <div className="pdf-reader-background">
            <Document file={infoSecPDF} onLoadError={console.log(infoSecPDF)}>
            <Page pageNumber={1} />
            </Document>
        </div>
    )
}