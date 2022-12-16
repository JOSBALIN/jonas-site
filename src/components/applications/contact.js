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
    const mail = {
      fromMail: e.target[3].value,
      body:  e.target[5].value
    }

    emailjs.send("Gmail", "template_a11lnf9", mail, "MXZIAi2k_cdxOUALP").then(
      (result) => {
      },
      (error) => {

      }
    );
  };

  return (
    <form name="contact-form" method="post">
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
      <div className="top-inputs">
        <div class="column1-row1"> 
          <div className="labels-icons">
            <img className="small-mail-icon" src={smallMailIcon} />{" "}
            <label htmlFor="recipient-mail">To:</label>
          </div>
        </div>
        <div class="column2-row1"> 
          <input
            type="email"
            id="recipient-mail"
            value="jonasbalin@gmail.com"
            readOnly
            disabled
          />
        
        </div>
        <div class="column1-row2"> 
          <div className="labels-icons">
            <img className="small-mail-icon" src={smallMailIcon} />
            <label htmlFor="sender-mail">From:</label>
          </div>
        
        </div>
        <div class="column2-row2"> 
        <input
            type="email"
            id="from-mail"
            name="fromMail"
            placeholder="your e-mail here"
          />
        </div>
        <div class="column1-row3"> 
          <div className="labels-icons">
            <label htmlFor="subject">Subject:</label>
          </div>
        
        </div>
        <div class="column2-row3"> 
        
        <input type="text" id="subject" name="subject" />
        </div>
      </div>

        <div className="labels-column">
        </div>
        <div class="inputs-column">


        </div>
      <textarea name="body" id="body"></textarea>
    </form>
  );
}
