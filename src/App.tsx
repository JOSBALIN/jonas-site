// import "./App.css";
// import { default as Subscribe } from "./Subscribe.tsx";

// export default function App() {
  
//   return (
//     <div className="App">
//       <Subscribe></Subscribe>
//       <button onClick={() => console.log(process.env.URL)}>BUTTONTEST</button>
//     </div>
//   );
// }


import React from 'react';
import './App.css';
import Desktop from "./components/desktop"

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Desktop/>
    </div>
  );
}

export default App;
