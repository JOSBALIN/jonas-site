import "./contact.css";

export default function Contact() {
  return (
    <div className="contact-background">
      <div className={"top-menu-photos"}>
        {" "}
        <img className="top-menu-img-photos"></img>
      </div>

      <div className="top-inputs">
        <label for="sender-mail">From:</label>
        <input type="email" id="sender-mail" placeholder="your e-mail here" />
        <br />
        <label for="recipient-mail">To:</label>
        <input
          type="email"
          id="recipient-mail"
          value="jonasbalin@gmail.com"
          readonly
          disabled
        />
        <br />
        <label for="subject">Subject:</label>
        <input type="text" id="subject" />
      </div>

      <textarea name="mail-body" id="mail-body"></textarea>

      <br />
      <label for="fname">Sincerely,</label>
      <input type="text" id="fname" name="fname" placeholder="your name" />
      <br></br>
    </div>
  );
}
