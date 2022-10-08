import { useEffect, useRef, useState } from "react";
import Draggable from "./hooks/Draggable";
import Resizeable from "./resizeable";

export function AppWindow(props) {
  const [isOpen, setIsOpen] = useState(props.open);
  console.log(isOpen);

  const [styles, setStyles] = useState({
    styles: {
      width:"400px",
      height:"600px"
    }
  })

 
  // DraggableElement function interpreted from https://codesandbox.io/s/priceless-hoover-j4vpn?file=/src/index.js
  const DraggableElement = ({ dragElement, parentElement }) => {
    const dragRef = useRef(null);
    const dragRefParent = useRef(null);
    Draggable(dragRef, dragRefParent);

    return (
      <div ref={dragRefParent} className="draggable Dialog parent"     style={styles}>
        <div ref={dragRef} className="draggable child">
          {dragElement}
        </div>
        {parentElement}
      </div>
    );
  };
  

  return (
    <DraggableElement
      dragElement={
        <div className="appTitle">
          My Dialog
          <div className="appTopBar">
            <button onClick={e => console.log(styles)}>Maximize</button>
            <button>X</button>
          </div>
        </div>
      }
      parentElement={
        <div>
          <div className="Contents">
            Contents of the Dialog: - one - two - three
          </div>
          <div className="closeButton">Close</div>
        </div>
      }
    ></DraggableElement>
  );
}

// Draggable window is a custom hook conversion of this source: https://github.com/Harjotb/TechLifeJo-Draggable-Element/blob/master/src/Components/Dialog.js

// useEffect explainer

// useEffect(() => {
//     This part runs when component is added to UI and states change
// })

// useEffect(() => {
//     code here
// },
// [dragging] <== This code only runs when this state is changed
//)

// useEffect(() => {
//     return () => This part runs when component is removed from UI
// })
