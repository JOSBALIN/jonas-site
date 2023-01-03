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
    window.alert("It has been detected that you are visiting this page on a phone or tablet.\nsome phone/tablet features are still in development and slight issues may therefore occur\nThank you for your understanding")
    setAlerted(true)
  }


  return (
    <div className="app-root">
      <Desktop/>
    </div>
  );
}

export default App;
