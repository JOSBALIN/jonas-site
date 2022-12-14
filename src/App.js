import "./App.css";
import ContactForm from "./components/ContactForm";

export default function App() {
  const sendMail = async () => {
    await fetch(
      `${process.env.URL}/.netlify/functions/emails/subscribed`,
      {
        headers: {
          "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
        },
        method: "POST",
        body: JSON.stringify({
          from: "jonasbalin@gmail.com",
          to: "jackbamm@hotmail.com",
          subject: "TEST",
          parameters: {
            name: "WIWIWIWIWIWI"
          },
        }),
      }
    );
  }
  
  return (
    <div className="App">
      <button onClick={() => sendMail}>AAA</button>
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
