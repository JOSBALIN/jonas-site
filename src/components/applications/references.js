import "./references.css";
import christianProfil from "../../images/application-images/references/Christian-profil.png";
import { useState } from "react";

export default function References(props) {
  const [selectedContact, setSelectedContact] = useState("");
  const [contacts, setContacts] = useState([
    {
      name: "Christian Borup",
      title: "Junior Consultant",
      company: "Implement Consulting Group",
      mail: "test@gmail.com",
      phone: "+45 3010 4050",
      photo: christianProfil,
      expandedText: "I met Christian at Ørestad Gymnasie where we completed high school together over three years. We have regularly stayed in touch since then and I consider Christian to be one of the finest workers I've known and one of my best friends."
    },
    {
      name: "Marchen Jersild",
      title: "Journalist",
      company: "Berlingske Media",
      photo: christianProfil,
    },
    {
      name: "Morten Rye Christensen",
      title: "VP Infrastructure & Operations",
      company: "Semler IT",
      photo: christianProfil,
    },
    {
      name: "Thomas Bach",
      title: "Operations Manager",
      company: "Semler IT",
      photo: christianProfil,
    },
    {
      name: "Mads Schack-Lindhardt",
      title: "IT Technical Consultant",
      company: "Implement Consulting Group",
      photo: christianProfil,
    },
    {
      name: "Christoffer Munk",
      title: "Data Activation Consultant",
      company: "Publicis Media",
      photo: christianProfil,
    },
    {
      name: "Christian Borup",
      title: "IT Student",
      company: "Implement Consulting Group",
      photo: christianProfil,
    },
  ]);

  const handleClick = (selected) => {
    setSelectedContact(selected);
  };

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
          <h3 className="reference-work">{selectedContact.title} | {selectedContact.company}</h3>
          <h4 className="contact-info">{selectedContact.mail} |{selectedContact.phone}</h4>
          <div className="contact-expanded-text">
          <p>{selectedContact.expandedText}</p>
          </div>

        </div>

        <div className="left-panel">
          {contacts.map((contact, index) => (
            <div
              className={"left-side-ref"}
              onClick={() => setSelectedContact(contact)}
              key={index}
            >
              <ul className="reference-short">
                <li className="reference-short-name">
                  <b>{contact.name}</b>
                </li>
                <li className="reference-short-position">{contact.title}</li>
                <li className="reference-short-company">{contact.company}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
