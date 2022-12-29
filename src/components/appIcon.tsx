import React from 'react';

interface Props {
  icon: string;
  title: string;
}

const AppIcon: React.FC<Props> = (props) => {
  return (
    <div className="app-icon">
      <div className="icon-img-overlay">
        <img className="icon-img" src={props.icon} />
      </div>
      <div className="app-tile-title">
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default AppIcon;