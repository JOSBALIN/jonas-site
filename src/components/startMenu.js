import "./startMenu.css"

export default function StartMenu () {
    return(
        <div className={"start-menu-background"}>
            <img className="invisible-image" src={require("../images/desktop-start-menu-compact.png")}></img>
            <div className="turn-off-computer"></div>
            </div>
    )
}