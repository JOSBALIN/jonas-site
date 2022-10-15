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
    ])


    
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
    



    return(
        <div className="photos-background">
            <div className={"top-menu-photos"}>      <img className="top-menu-img-photos" src={topBarImage}></img></div>
            <div className="focused-photo">
                <img className="focused-photo-img" src={selectedPhoto}>

                </img>
            </div>
            <div className="photos-row">
            {photosMetadata.map((data, index) => 
            <div className="photos-preview" key={index}>{photoDisplay(data.photo, data.shortText)}
            <p>{data.shortText}</p>
            </div>
            )}
            </div>
        </div>
    )
}