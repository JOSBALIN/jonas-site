import "./photoViewer.css"
import ellieJonas from "../../images/photos/EllieJonas.jpg";
import { useState } from "react";
import { render } from "@testing-library/react";
import { useEffect } from "react";
import topBarImage from "../../images/application-images/photoViewer-top-menu.png";

export default function PhotoViewer(props) {

    // Future refactoring, place all photos and lists of these in external file
    const [photosMetadata, setPhotosMetadata] = useState([
        {
            photo: "EllieJonas.jpg",
            shortText: "My dog and me!",
        },
        {
            photo: "EllieJonas2.jpg",
            shortText: "My dog and me (again)!",
        },
        {
            photo: "Jonas.jpg",
            shortText: "Master's graduation",
        },
        {
            photo: "JonasGuitar.jpg",
            shortText: "Guitar w/ fam",
        },
        {
            photo: "SilasJonas.jpg",
            shortText: "W/ colleague at work party",
        },
        {
            photo: "EllieJonas.jpg",
            shortText: "My dog 123123123 me!",
        },
        {
            photo: "EllieJonas2.jpg",
            shortText: "My dog and me (123123)!",
        },
        {
            photo: "EllieJonas2.jpg",
            shortText: "Master's 43434",
        },
        {
            photo: "JonasGuitar.jpg",
            shortText: "Guitar1232 w/ fam",
        },
        {
            photo: "SilasJonas.jpg",
            shortText: "W/ colleagu2323e at work party",
        },
    ])

    const [displayPage, setDisplayPage] = useState(1);



    
    // Import photo code borrowed from https://gist.github.com/shaquille-galimba/64f462f0b119945630427f9bedeceba7
    const importAll = (r) => {
        let images = {};
        r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    
    const images = importAll(require.context('../../images/photos', false, /\.(png|jpe?g|svg)$/));

    
    const [selectedPhoto, setSelectedPhoto] = useState(images[photosMetadata[0].photo])
    
    
    const photoDisplay = (photo, shortText) => {
        return (<img src={images[`${photo}`]} alt={shortText} key={shortText} onClick={() => handleClick(photo, shortText)} className={"preview-images"}/>
        )
    }
    
    const handleClick = (photo, text) => {
        setSelectedPhoto(images[`${photo}`])
    }
    
    const setBackground = () => {
        document.getElementById("desktop-background").style.backgroundImage = "url("+selectedPhoto+")"
    }



    return(
        <div className="photos-background">
            <div className={"top-menu-photos"}>      <img className="top-menu-img-photos" src={topBarImage}></img></div>
            <div className="focused-photo">
                <img className="focused-photo-img" src={selectedPhoto}>

                </img>
                <button onClick={() => setBackground()}>Set as background picture</button>
            </div>
            <div className="photos-row">
            <button onClick={() => setDisplayPage((displayPage) => displayPage - 1)      }>Previous page</button>
            {photosMetadata.slice((displayPage*5-5), (displayPage*5)).map((data, index) => 
            <div className="photos-preview" key={index}>
                <div className="photos-preview-upper">{photoDisplay(data.photo, data.shortText)}</div>
                <div className="photos-preview-lower"><p>{data.shortText}</p></div>
            </div>
            )}
            <button onClick={() => setDisplayPage((displayPage) => displayPage + 1)      }>Next page</button>
            </div>
        </div>
    )
}