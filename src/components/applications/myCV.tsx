import "./myCV.css";
import topBarImage from "../../images/application-images/myCV-top-menu.png";
import React from "react";

export default function MyCV() {
  return (
    <div id={"cv-background"}>
      <div className={"top-menu"}>
        {" "}
        <img className="top-menu-img" src={topBarImage}></img>
      </div>
      <div className={"text-contents"} contentEditable={true}>
        <h1 className="cv-title">Jonas Balin - CV</h1>
        <h2 className="cv-headline">Summary</h2>
        <p>
          A professional, ambitious, and efficient employee, and also a highly
          social, empathetic, and respectful colleague. IT has been my main
          passion in both academia, work, and pastime. Beside my professional
          endeavors, I am volunteering my IT skills for philanthropic NGOs such
          as{" "}
          <a href="https://www.senfoelger.dk/" target="_blank">
            Senfølgerforeningen
          </a>
          .
          <br />
        </p>
        <h2 className="cv-headline">Education</h2>
        <h3 className="cv-subheadline">
          IT University of Copenhagen, 2020-2022
        </h3>
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
        <h3 className="cv-subheadline">University of Copenhagen, 2016-2019</h3>
        <h4 className="cv-position-title">B.S in Communication and IT</h4>
        <ul className="cv-list">
          <li>
            Contextualization and application of communication and design theory
            with emphasis on IT
          </li>
          <li>Light programming, web-development (JS, CSS, HTML, CMS'es)</li>
          <li>Interaction design, designing software with HCI in mind</li>
        </ul>
        <h2 className="cv-headline">Professional Experience</h2>
        <h3 className="cv-subheadline">Semler IT, 2021-2022</h3>
        <h4 className="cv-position-title">IT Consultant</h4>
        <ul className="cv-list">
          <li>
            Process optimization and automation in Power platform with
            development of several internal applications and RPA flows.
          </li>
        </ul>
        <h3 className="cv-subheadline">
          Implement Consulting Group, 2019-2021
        </h3>
        <h4 className="cv-position-title">IT Assistant</h4>
        <ul className="cv-list">
          <li>IT Support with focus on O365, hardware, software issues</li>
          <li>
            Internal development of several PowerApps applications, Power
            Automate RPAs (With the goal of process optimization)
          </li>
        </ul>
        <h3 className="cv-subheadline">Avenue Trading, 2018-2019</h3>
        <h4 className="cv-position-title">Online Manager</h4>
        <ul className="cv-list">
          <li>
            Development and maintenance of numerous websites across different
            CMS'es in an agile workflow
          </li>
        </ul>
        <h2 className="cv-headline">Secondary endeavors</h2>
        <h3>Website development, "JonasXP"</h3>
        <p>
          The website you're reading this on right now was developed solely by
          me as a show of skills and as portfolio management.
        </p>
        <p>This includes:</p>
        <ul className="cv-list">
          <li>
            Concept development of both the entire site and individual
            "applications"
          </li>
          <li>
            Coding both site and individual applications from ground-up
            (ReactJS, .js, .tsx)
          </li>
          <li>
            Modular design (easily allowing for future "app installations")
          </li>
          <li>Implementation of numerous node packages such as a pdf-reader</li>
          <li>Continuous deployment using Git</li>
          <li>Domain and deployment of site (using Netlify)</li>
          <li>Integrating e-mail service to allow contact via website</li>
          <li>
            Securely storing API keys using server-side functions and
            environment variables
          </li>
        </ul>
        <p>
          If you're interested in the technical structure of this site or
          further details on its development, I highly recommend you check out
          the GitHub repo's readme, or the documentation application found on
          the desktop.
        </p>
        <h3 className="cv-subheadline">Senfølgerforeningen, 2022-Ongoing</h3>
        <h4 className="cv-position-title">Volunteer</h4>
        <p>I am currently volunteering for Senfølgerforeningen, an organization that aids people with latent effects of cancer. As the only person in the organization with a degree in IT, I am handling most of their IT needs.</p>
        <h2 className="cv-headline">References</h2>
      </div>
    </div>
  );
}
