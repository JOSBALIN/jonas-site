import taskbarAppImage from ".././images/desktop-taskbar-app.png";
import '../App.css';

export default function TaskbarApps(props) {
  const appIcon = props.icon;
  const appTitle = props.title;

  return (
    <div className="taskbar-application">
      <div id="app-title">{appTitle}</div>
      <img className="taskbar-application-img" src={taskbarAppImage}></img>
    </div>
  );
}