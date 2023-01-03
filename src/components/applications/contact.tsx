import "./contact.css";
import topBarImage from "../../images/application-images/contact-top-menu.png";
import topBarImageHover from "../../images/application-images/contact-top-menu-hover.png";
import topBarImagePressed from "../../images/application-images/contact-top-menu-pressed.png";
import smallMailIcon from "../../images/application-images/contact-to-from.png";
import { useRef, useState } from "react";
import React from "react";
import { HoverTooltip } from "../hoverTooltip";
import ReCAPTCHA from "react-google-recaptcha"

export default function Contact() {
  const [topImage, setTopImage] = useState<string>(topBarImage);
  const [recaptchaResponse, setRecaptchaResponse] = React.useState<string>('');
  const [showRecaptcha, setShowRecaptcha] = useState<boolean>(true);
  const formRef = React.createRef<HTMLFormElement>();


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

    //call to the Netlify Function created
    fetch("./.netlify/functions/triggerSubscribeEmail", {
      method: "POST",
      body: JSON.stringify({
        contactFrom: target.from.value,
        contactSubject: target.subject.value,
        contactBody: target.body.value,
      }),
    });
    
    formRef.current.reset();
    window.alert("Your message has been sent! I will get back to you at my earliest convenience. Thank you for your patience.")
  };

  const handleRecaptcha = (response) => {
    setRecaptchaResponse(response);
    // keep reCAPTCHA on screen before hiding automatically
    setTimeout(() => {setShowRecaptcha(false);
    }, 1400)
  }


  return (
    <form className="contact-form" name="contact-form" method="post" onSubmit={handleSubmit} ref={formRef}>
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
        ></button>
        <img className="top-menu-img-contact" src={topImage}></img>
      </div>
      {showRecaptcha && (
        <ReCAPTCHA
          sitekey={"6LcnwKkjAAAAALsbCxaNrKwTw85uBqK8acInKk9B"}
          onChange={(response) => handleRecaptcha(response)}
          style={{ position: 'absolute', top: 64, left: 6}}
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
            type="text"
            id="from-mail"
            name="from"
            placeholder="your e-mail/name here"
            required
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
    </form>
  );
}

