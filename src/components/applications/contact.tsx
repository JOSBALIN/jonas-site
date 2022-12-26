import "./contact.css";
import topBarImage from "../../images/application-images/contact-top-menu.png";
import topBarImageHover from "../../images/application-images/contact-top-menu-hover.png";
import topBarImagePressed from "../../images/application-images/contact-top-menu-pressed.png";
import smallMailIcon from "../../images/application-images/contact-to-from.png";
import { useRef, useState } from "react";
import React from "react";
import { HoverTooltip } from "../hoverTooltip";
import { useMouseCoordinates } from "../hooks/useMouseCoordinates";
import ReCAPTCHA from "react-google-recaptcha"

export default function Contact() {
  const [topImage, setTopImage] = useState(topBarImage);
  const [recaptchaResponse, setRecaptchaResponse] = React.useState('');
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const hoverRef = useRef(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!recaptchaResponse) {
      // ReCAPTCHA has not been completed yet
      setShowRecaptcha(true);
      return;
    }

    const target = event.target as typeof event.target & {
      from: { value: string };
      subject: { value: string };
      body: { value: string };
    };

    const data = {
      contactFrom: target.from.value,
      contactSubject: target.subject.value,
      contactBody: target.body.value,
    };

    //call to the Netlify Function you created
    fetch("./.netlify/functions/triggerSubscribeEmail", {
      method: "POST",
      body: JSON.stringify({
        contactFrom: data.contactFrom,
        contactSubject: data.contactSubject,
        contactBody: data.contactBody,
      }),
    });
  };

  const handleRecaptcha = (response) => {
    setRecaptchaResponse(response);
    setTimeout(() => {    setShowRecaptcha(false);
    }, 1000)
  }


  return (
    <form name="contact-form" method="post" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact-form" />
      <div className={"top-menu-contact"}>
        {/* Send button is invisible, overlaid the actual image */}
        <button
          type="submit"
          id="send-button"
          onMouseEnter={() => setTopImage(topBarImageHover)}
          onMouseLeave={() => setTopImage(topBarImage)}
          onMouseUp={() => setTopImage(topBarImageHover)}
          onMouseDownCapture={() => setTopImage(topBarImagePressed)}
          ref={hoverRef}
        ></button>
        <img className="top-menu-img-contact" src={topImage}></img>
      </div>
      {showRecaptcha && (
        <ReCAPTCHA
          sitekey=""
          onChange={(response) => handleRecaptcha(response)}
          executeOnLoad={false}
          style={{ position: 'absolute', top: 64, left: 6 }}
        />
      )}
      <div className="top-inputs">
        <div className="column1-row1">
          <div className="labels-icons">
            <img className="small-mail-icon" src={smallMailIcon} />{" "}
            <label htmlFor="recipient-mail">To:</label>
          </div>
        </div>
        <div className="column2-row1">
          <input
            type="email"
            id="recipient-mail"
            value="jonasbalin@gmail.com"
            readOnly
            disabled
          />
        </div>
        <div className="column1-row2">
          <div className="labels-icons">
            <img className="small-mail-icon" src={smallMailIcon} />
            <label htmlFor="from">From:</label>
          </div>
        </div>
        <div className="column2-row2">
          <input
            type="email"
            id="from-mail"
            name="from"
            placeholder="your e-mail/name here"
          />
        </div>
        <div className="column1-row3">
          <div className="labels-icons">
            <label htmlFor="subject">Subject:</label>
          </div>
        </div>
        <div className="column2-row3">
          <input type="text" id="subject" name="subject" required />
        </div>
      </div>

      <div className="labels-column"></div>
      <div className="inputs-column"></div>
      <textarea name="body" id="body" required></textarea>
      <HoverTooltip text="This is the hover tooltip" reference={hoverRef.current} />
    </form>
  );
}

