import "./contact.css";
import emailjs from "emailjs-com";
import topBarImage from "../../images/application-images/contact-top-menu.png";
import topBarImageHover from "../../images/application-images/contact-top-menu-hover.png";
import topBarImagePressed from "../../images/application-images/contact-top-menu-pressed.png";
import smallMailIcon from "../../images/application-images/contact-to-from.png";
import { useState } from "react";

export default function Contact() {
  const [topImage, setTopImage] = useState(topBarImage);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("Gmail", "template_a11lnf9", e.target).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
      <form onSubmit={sendEmail}>
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

        <div className="top-inputs">
          <div className="labels-icons">
          <img className="small-mail-icon" src={smallMailIcon} />{" "}
          <label htmlFor="recipient-mail">To:</label>
          </div>
          <input
            type="email"
            id="recipient-mail"
            value="jonasbalin@gmail.com"
            readOnly
            disabled
          />
          <div className="labels-icons">
          <img className="small-mail-icon" src={smallMailIcon} />
          <label htmlFor="sender-mail">From:</label>
          </div>
          <input
            type="email"
            id="from-mail"
            name="fromMail"
            placeholder="your e-mail here"
          />
          <div className="labels-icons">
          <label htmlFor="subject">Subject:</label>
          </div>
          <input type="text" id="subject" name="subject" />
        </div>
        <textarea name="body" id="body"></textarea>
      </form>
  );
}
