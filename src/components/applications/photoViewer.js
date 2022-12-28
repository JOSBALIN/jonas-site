import "./photoViewer.css";
import ellieJonas from "../../images/photos/EllieJonas.jpg";
import { useState } from "react";
import { render } from "@testing-library/react";
import { useEffect } from "react";
import topBarImage from "../../images/application-images/photoViewer-top-menu.png";
import previousPhoto from "../../images/application-images/photos-arrow-back.png";
import nextPhoto from "../../images/application-images/photos-arrow-next.png";
import setBackgroundIcon from "../../images/application-images/photoViewer-set-background.ico";

export default function PhotoViewer() {
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
      photo: "JonasJan02.jpg",
      shortText: "My brother and me",
    },
    {
      photo: "JonasJan03.jpg",
      shortText: "My brother and me, again",
    },
    {
      photo: "JonasJan04.jpg",
      shortText: "My brother and me, again, again",
    },
    {
      photo: "JonasJan01.jpg",
      shortText: "Okay, we probably went too far here",
    },
  ]);

  // Import photo code borrowed from https://gist.github.com/shaquille-galimba/64f462f0b119945630427f9bedeceba7
  const importAllPhotos = (r) => {
    let images = {};
    r.keys().forEach((item) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  const images = importAllPhotos(
    require.context("../../images/photos", false, /\.(png|jpe?g|svg)$/)
  );

  const [selectedPhoto, setSelectedPhoto] = useState({
    photo: images[photosMetadata[0].photo],
    index: 0,
  });

  const displayPreviewPhotos = (photo, shortText, index) => {
    return (
      <img
        src={images[`${photo}`]}
        alt={shortText}
        key={shortText}
        onClick={() => handlePreviewClick(photo, shortText, index)}
        className={"preview-images"}
      />
    );
  };

  const handlePreviewClick = (photo, text, index) => {
    setSelectedPhoto({
      photo: images[`${photo}`],
      index: index,
      text: text,
    });
  };

  const setDesktopBackground = () => {
    document.getElementById("desktop-background").style.backgroundImage =
      "url(" + selectedPhoto.photo + ")";
  };

  const iterateFocusedPhoto = (direction) => {
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
            onClick={() => iterateFocusedPhoto("previous")}
          ></div>
          <div
            id="embedded-next-photo"
            onClick={() => iterateFocusedPhoto("next")}
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
            onClick={() => iterateFocusedPhoto("previous")}
          />
          <img
            className="photo-controls"
            id="next-photo"
            src={nextPhoto}
            onClick={() => iterateFocusedPhoto("next")}
          />
          <img
            className="photo-controls"
            onClick={() => setDesktopBackground()}
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
              {displayPreviewPhotos(data.photo, data.shortText, index)}
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
