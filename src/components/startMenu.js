import "./startMenu.css"

export default function StartMenu () {
    return(
        <div className={"start-menu-background"}>
            <img className="invisible-image" src={require("../images/desktop-start-menu-compact.png")}></img>
            <div className="start-menu-button start-menu-app a01"></div>
            <div className="start-menu-button start-menu-app a02"></div>
            <div className="start-menu-button start-menu-app a03"></div>
            <div className="start-menu-button start-menu-app a04"></div>
            <div className="start-menu-button log-off"></div>
            <div className="start-menu-button turn-off-computer"></div>
            </div>
    )
}