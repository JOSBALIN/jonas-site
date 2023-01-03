import React from "react"
import "./aboutThisApp.css"

const AboutThisApp: React.FC = (props) => {
   
    return (
      <div className="about-app-background">
        <div className="about-app-top-menu">
          <img className="top-menu-img"></img>
        </div>
        <div className="about-app-text">
          <h1 className="about-title">About JonasXP</h1>
          <h2 className="about-headline">Introduction</h2>
          <p>
          This text describes the purpose of the JonasXP site, choices in design, technical implementations, bugs, and room for improvement. Use the menu on the left to jump around to different sections.
          </p>
        </div>
      </div>
    );
}

export default AboutThisApp