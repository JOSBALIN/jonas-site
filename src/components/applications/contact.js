import "./contact.css";
import emailjs from "emailjs-com"
import topBarImage from "../../images/application-images/contact-top-menu.png";
import topBarImageHover from "../../images/application-images/contact-top-menu-hover.png";
import topBarImagePressed from "../../images/application-images/contact-top-menu-pressed.png";
import { useState } from "react";


export default function Contact() {
  const [topImage, setTopImage] = useState(topBarImage)

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('Gmail', 'template_a11lnf9', e.target, )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <div className="contact-background">
      <div className={"top-menu-contact"}>
        <div
          id="send-button"
          onMouseEnter={() => setTopImage(topBarImageHover)}
          onMouseLeave={() => setTopImage(topBarImage)}
          onMouseUp={() => setTopImage(topBarImageHover)}
          onMouseDownCapture={() => setTopImage(topBarImagePressed)}
        ></div>
        <img className="top-menu-img-contact" src={topImage}></img>
      </div>

      <form onSubmit={sendEmail}>
        <div className="top-inputs">
          <label htmlFor="sender-mail">From:</label>
          <input
            type="email"
            id="from-mail"
            name="fromMail"
            placeholder="your e-mail here"
          />
          <br />
          <label htmlFor="recipient-mail">To:</label>
          <input
            type="email"
            id="recipient-mail"
            value="jonasbalin@gmail.com"
            readOnly
            disabled
          />
          <br />
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" />
        </div>

        <textarea name="body" id="body"></textarea>

        <br />

        <button type="submit">Send mail!</button>
      </form>
      <br></br>
    </div>
  );
}
