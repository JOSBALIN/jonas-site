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


import './App.css';
import Desktop from "./components/desktop"

function App() {
  return (
    <div className="app-root">

      <Desktop/>
    </div>
  );
}

export default App;
