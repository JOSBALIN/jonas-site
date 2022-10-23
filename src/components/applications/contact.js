import "./contact.css";
import emailjs from "emailjs-com"

export default function Contact() {


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
      <div className={"top-menu-photos"}>
        {" "}
        <img className="top-menu-img-photos"></img>
      </div>

<form onSubmit={sendEmail}>
      <div className="top-inputs">
        <label htmlFor="sender-mail">From:</label>
        <input type="email" id="from-mail" name="fromMail" placeholder="your e-mail here" />
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
      <label htmlFor="fromName">Sincerely,</label>
      <input type="text" id="from-name" name="fromName" placeholder="your name" />

      <button type="submit">Send mail!</button>
      </form>
      <br></br>
    </div>
  );
}
