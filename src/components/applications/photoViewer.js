import "./photoViewer.css";
import ellieJonas from "../../images/photos/EllieJonas.jpg";
import { useState } from "react";
import { render } from "@testing-library/react";
import { useEffect } from "react";
import topBarImage from "../../images/application-images/photoViewer-top-menu.png";
import previousPhoto from "../../images/application-images/photos-arrow-back.png";
import nextPhoto from "../../images/application-images/photos-arrow-next.png";
import setBackgroundIcon from "../../images/application-images/photoViewer-set-background.ico";

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
      photo: "Bliss.jpg",
      shortText: "Bliss, Bucolic Green Hills",
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
  ]);

  // Import photo code borrowed from https://gist.github.com/shaquille-galimba/64f462f0b119945630427f9bedeceba7
  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  const images = importAll(
    require.context("../../images/photos", false, /\.(png|jpe?g|svg)$/)
  );

  const [selectedPhoto, setSelectedPhoto] = useState({
    photo: images[photosMetadata[0].photo],
    index: 0,
  });

  const photoDisplay = (photo, shortText, index) => {
    return (
      <img
        src={images[`${photo}`]}
        alt={shortText}
        key={shortText}
        onClick={() => handleClick(photo, shortText, index)}
        className={"preview-images"}
      />
    );
  };

  const handleClick = (photo, text, index) => {
    setSelectedPhoto({
      photo: images[`${photo}`],
      index: index,
      text: text,
    });
  };

  const setBackground = () => {
    document.getElementById("desktop-background").style.backgroundImage =
      "url(" + selectedPhoto.photo + ")";
  };

  const iteratePhoto = (direction) => {
    if (direction === "next") {
      const nextPhoto = photosMetadata[selectedPhoto.index + 1].photo;
      setSelectedPhoto({
        photo: images[`${nextPhoto}`],
        index: selectedPhoto.index + 1,
      });
    } else {
      const nextPhoto = photosMetadata[selectedPhoto.index - 1].photo;
      setSelectedPhoto({
        photo: images[`${nextPhoto}`],
        index: selectedPhoto.index - 1,
      });
    }
  };

  return (
    <div className="photos-background">
      <div className={"top-menu-photos"}>
        <img className="top-menu-img-photos" src={topBarImage}></img>
        <div className="top-menu-embedded-controls">
          <div
            id="embedded-previous-photo"
            onClick={() => iteratePhoto("previous")}
          ></div>
          <div
            id="embedded-next-photo"
            onClick={() => iteratePhoto("next")}
          ></div>
        </div>
      </div>
      <div className="focused-photo">
        <img className="focused-photo-img" src={selectedPhoto.photo}></img>
        <div className="sub-menu">
          <img
            className="photo-controls"
            id="previous-photo"
            src={previousPhoto}
            onClick={() => iteratePhoto("previous")}
          />
          <img
            className="photo-controls"
            id="next-photo"
            src={nextPhoto}
            onClick={() => iteratePhoto("next")}
          />
          <img
            className="photo-controls"
            onClick={() => setBackground()}
            id="set-background"
            src={setBackgroundIcon}
          ></img>
          <br />
        </div>
      </div>
      <div className="photos-row">
        {photosMetadata.map((data, index) => (
          <div className="photos-preview" key={index}>
            <div className="photos-preview-upper">
              {photoDisplay(data.photo, data.shortText, index)}
            </div>
            <div className="photos-preview-lower">
              <p>{data.shortText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
