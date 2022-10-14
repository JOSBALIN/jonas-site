import "./photoViewer.css"
import ellieJonas from "../../images/photos/EllieJonas.jpg";
import { useState } from "react";
import { render } from "@testing-library/react";
import { useEffect } from "react";
import topBarImage from "../../images/application-images/photoViewer-top-menu.png";

export default function MusicPlayer(props) {
    const [count, setCount] = useState(20)
    const photosMetadata = [
        {
            photo: "EllieJonas.jpg",
            text: "My dog and me!"
        },
        {
            photo: "EllieJonas2.jpg",
            text: "My dog and me (again)!"
        },
        {
            photo: "Jonas.jpg",
            text: "Master's graduation"
        },
        {
            photo: "JonasGuitar.jpg",
            text: "Guitar w/ fam"
        },
        {
            photo: "SilasJonas.jpg",
            text: "W/ colleague at work party"
        },
    ]

    console.log(count)

    
    // Import photo code borrowed from https://gist.github.com/shaquille-galimba/64f462f0b119945630427f9bedeceba7
    const importAll = (r) => {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    
    const images = importAll(require.context('../../images/photos', false, /\.(png|jpe?g|svg)$/));
    
    const photo = (photo, text) => {
        return (<img src={images[`${photo}`]} alt={text} key={text} onClick={(e) => handleClick(e)} className={"preview-images"}/>
        )
    }
    
    const handleClick = (e) => {
        // delete existing selected photo, assign class to new
        let selectedPhoto = Array.from(document.getElementsByClassName(" selected-photo"))[0]
        if(selectedPhoto !== undefined) selectedPhoto.className = ""

        e.currentTarget.className = "selected-photo"
        // Set focused-photo-img element's image to be currentTarget
        Array.from(document.getElementsByClassName("focused-photo-img"))[0].src = e.target.src
    }
    



    return(
        <div className="photos-background">
            <div className={"top-menu-photos"}>      <img className="top-menu-img-photos" src={topBarImage}></img></div>
            <div className="focused-photo">
                <img className="focused-photo-img" src={images[`${"EllieJonas.jpg"}`]}>

                </img>
            </div>
            <div className="photos-row">
            {photosMetadata.map((data, index) => 
            <div className="photos-preview" key={index}>{photo(data.photo, data.text)}
            <p>{data.text}</p>
            </div>
            )}
            </div>
        </div>
    )
}