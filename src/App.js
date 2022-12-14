import "./App.css";
import { default as Subscribe } from "./Subscribe.tsx";

export default function App() {

  const sendMail = async () => {
    await fetch(
      `http://localhost:8000/.netlify/functions/emails/subscribed`,
      {
        headers: {
          "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
        },
        method: "POST",
        body: JSON.stringify({
          from: "jonasbalin@gmail.com",
          to: "jackbamm@hotmail.com",
          subject: "THIS IS MESSAGE",
          parameters: {
            name: "JOBAL"
          },
        }),
      }
    );
  }
  
  return (
    <div className="App">
      <Subscribe></Subscribe>
      <button onClick={() => console.log(process.env.URL)}>BUTTONTEST</button>
    </div>
  );
}


// import './App.css';
// import Desktop from "./components/desktop"
// import { useState, useEffect } from 'react';

// function App() {



  


//   return (
//     <div className="app-root">

//       <Desktop/>
//     </div>
//   );
// }

// export default App;
