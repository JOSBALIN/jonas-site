import "./myCV.css";
import topBarImage from "../../images/application-images/myCV-top-menu.png";

export default function MyCV() {


  return (
    <div id={"cv-background"}>
      <div className={"top-menu"} id="taskbar">      <img className="top-menu-img" src={topBarImage}></img></div>
      <div className={"text-contents"}>
      <h1 className="cv-title">Jonas Balin - CV</h1>
      <h2 className="cv-headline">Summary</h2>
      <p>
        A professional, ambitious, and efficient employee, and also a highly
        social, empathetic, and respectful colleague. IT has been my main
        passion in both academia, work, and pastime. Beside my professional
        endeavors, I am volunteering my IT skills for philanthropic NGOs such as{" "}
        <a href="https://www.senfoelger.dk/">Senfølgerforeningen</a>.
        <br />
      </p>
      <h2 className="cv-headline">Education</h2>
      <h3 className="cv-subheadline">IT University of Copenhagen</h3>
      <h4 className="cv-position-title">M.S in Software Design</h4>
        <ul className="cv-list">
          <li>
            Comprehensive programmatic education with focus on software
            development, algorithm design, data structures, and UX design
          </li>
          <li>
            Top marked thesis with focus on Virtual Reality Multimedia Database
            software (C#, Unity) and software usability
          </li>
        </ul>
      <h3 className="cv-subheadline">University of Copenhagen</h3>
      <h4 className="cv-position-title">B.S in Communication and IT</h4>
      <ul className="cv-list">
          <li>
            Contextualization and application of communication and design theory
            with emphasis on IT
          </li>
          <li>Light programming, web-development</li>
          <li>Interaction design, designing software with HCI in mind</li>
          </ul>
      <h2 className="cv-headline">Experience</h2>
      <h3 className="cv-subheadline">Semler IT</h3>
      <h4 className="cv-position-title">IT Consultant</h4>
      <ul className="cv-list">
        <li>
          Process optimization and automation in Power platform with development
          of several internal applications and RPA flows.
        </li>
      </ul>
      <h3 className="cv-subheadline">Implement Consulting Group</h3>
      <h4 className="cv-position-title">IT Assistant</h4>
      <ul className="cv-list">
        <li>IT Support with focus on O365, hardware, software issues</li>
        <li>
          Internal development of several PowerApps applications, Power Automate
          RPAs (With the goal of process optimization)
        </li>
      </ul>
      <h3 className="cv-subheadline">Avenue Trading</h3>
      <h4 className="cv-position-title">Online Manager</h4>
      <ul className="cv-list">
        <li>
          Development and maintenance of numerous websites across different
          CMS'es in an agile workflow
        </li>
      </ul>
      <h2 className="cv-headline">Skills</h2>
      <h2 className="cv-headline">References</h2>
      </div>
    </div>
  );
}
