import "./references.css";
import christianProfil from "../../images/application-images/references/Christian-profil.png";
import { useState } from "react";
import { hover } from "@testing-library/user-event/dist/hover";
import PortfolioTextsMenu from "./portfolio/portfolioTextsMenu";

export default function References(props) {
  const [contacts, setContacts] = useState([
    {
      name: "Christian Borup",
      title: "Junior Consultant, colleague",
      company: "Implement Consulting Group",
      mail: "test@gmail.com",
      phone: "+45 3010 4050",
      photo: christianProfil,
      expandedText: "I met Christian at Ørestad Gymnasium where we completed high school together over three years. We have regularly stayed in touch since then and I consider Christian to be one of the finest workers I've known and one of my best friends. I referred him to his current position at my former employer, Implement Consulting Group, so he owes me one."
    },
    {
      name: "Marchen Jersild",
      title: "Journalist, mom",
      company: "Berlingske Media",
      photo: christianProfil,
      expandedText: "Marchen is my mother and I am relatively sure she will give me a decent reference."
    },
    {
      name: "Morten Rye Christensen",
      title: "VP Infrastructure & Operations, employer",
      company: "Semler IT",
      photo: christianProfil,
    },
    {
      name: "Thomas Bach",
      title: "Operations Manager, employer",
      company: "Semler IT",
      photo: christianProfil,
    },
    {
      name: "Mads Schack-Lindhardt",
      title: "IT Technical Consultant, colleague",
      company: "Implement Consulting Group",
      photo: christianProfil,
    },
    {
      name: "Christoffer Munk",
      title: "Data Activation Consultant, employer",
      company: "Publicis Media",
      photo: christianProfil,
    },
    {
      name: "Christian Borup",
      title: "IT Student, colleague",
      company: "Implement Consulting Group",
      photo: christianProfil,
    },
  ]);


  function changeHoverState(e) {
    const elementStyle = e.target.style;
    if (e.type == "mouseover") {
      elementStyle.textDecoration = "underline";
    } else {
      elementStyle.textDecoration = "none";
      elementStyle.fontWeight = "normal"
    }
  }

  const handleClick = (e, contact) => {
    setSelectedContact(contact);
    var i, activeContacts

    activeContacts = document.getElementsByClassName("active-contact");
    for (i = 0; i < activeContacts.length; i++) {
      activeContacts[i].className = activeContacts[i].className.replace(" active-contact", "");
    }

    e.currentTarget.className += " active-contact";
  };

  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <div className="references-background">
      <div className={"top-menu-photos"}>
        {" "}
        <img className="top-menu-img-photos"></img>
      </div>
      <div className="references-container">
        <div className="references-selected">
          <img
            src={selectedContact.photo}
            className="references-selected-photo"
          ></img>
          <h1 className="reference-name">{selectedContact.name}</h1>
          <h3 className="reference-work">
            {selectedContact.title} | {selectedContact.company}
          </h3>
          <h4 className="contact-info">
            {" "}
            <a href={"mailto:" + selectedContact.mail}>
              {selectedContact.mail}
            </a>{" "}
            |{" "}
            <a href={"tel:" + selectedContact.phone}>{selectedContact.phone}</a>
          </h4>
          <div className="contact-expanded-text">
            <p>{selectedContact.expandedText}</p>
          </div>
        </div>

        <div className="left-panel">
          <ul className="list-references">
            {contacts.map((contact, index) => (
              <li
              key={index}
                className="element-reference"
                onClick={(e) => handleClick(e, contact)}
                onMouseOver={(e) => changeHoverState(e)}
                onMouseLeave={(e) => changeHoverState(e)}
              >
                {contact.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
