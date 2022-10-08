import {useRef, useState } from "react";
import Draggable from "./hooks/draggable";

export function AppWindow(props) {
  // Initial width
  const [width, setWidth] = useState(400)
  
  // app information
  const [title, setTitle] = useState(props.title)
  const [contents, setContents] = useState(props.contents)


  // DraggableElement function interpreted from https://codesandbox.io/s/priceless-hoover-j4vpn?file=/src/index.js
  const DraggableElement = ({ dragElement, parentElement }) => {
    const dragRef = useRef(null);
    const dragRefParent = useRef(null);
    Draggable(dragRef, dragRefParent);

    return (
      <div
        ref={dragRefParent}
        className={"draggable-parent dialog"}
        style={{width: width}} // mutable width value
      >

        <div ref={dragRef} className="draggable-child">
          {dragElement}
        </div>
        {parentElement}
      </div>
    );
  };

  const MaximizeButton = ({ givenWidth }) => {
    return (
      <button onClick={() => setWidth(givenWidth)} >MAXIMIZE</button>
    )
  }

  return (
    <DraggableElement
      dragElement={
        <div className="app-topbar">
                      <button onClick={() => setWidth(600)}>X</button>
          <div className="app-title">
            {title}
            
          </div>
        </div>
      }
      parentElement={
        <div>
          <div className="contents">
            {contents}
          </div>
        </div>
      }
    ></DraggableElement>
  );
}



  // Explainers
  // <DraggableElement dragElement={element mouse hold} parentElement={parent to drag}

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
