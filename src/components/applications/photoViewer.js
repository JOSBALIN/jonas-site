import "./photoViewer.css"
import ellieJonas from "../../images/photos/EllieJonas.jpg";
import { useState } from "react";

export default function PhotoViewer() {
    const [photos, setPhotos] = [
        {
            photo: ellieJonas,
            text: "Photo Title"
        }
    ]

    return(
        <div>
        <img className="icon-img" src={ellieJonas}></img>
        <h1>hi!</h1>
        </div>
    )
}