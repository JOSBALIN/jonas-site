import React, { useEffect, useState } from 'react';
import './App.css';
import Desktop from "./components/desktop"

const App: React.FC = () => {
  // Detect whether device is phone or PC
  const [device, setDevice] = useState(null);
  const [alerted, setAlerted] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      setDevice('phone');
    } else {
      setDevice('pc');
    }
  }, []);

  if(!alerted && device === "phone"){
    window.alert("Full phone/tablet compatability is currently in development and slight issues may therefore occur on such devices\nThank you for your understanding")
    setAlerted(true)
  }


  return (
    <div className="app-root">
      <Desktop/>
    </div>
  );
}

export default App;
