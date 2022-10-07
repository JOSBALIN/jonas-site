import { useEffect, useRef, useState } from "react";
import Draggable from "./hooks/Draggable";

export function AppWindow() {
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [styles, setStyles] = useState({});

  const [resizing, setResizing] = useState(false);
  const [resizeDiffX, setResizeDiffX] = useState(0);
  const [origWidth, setOrigWidth] = useState(0);

  function dragStart(e) {
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
    setDragging(true);
  }

  function draggingMid(e) {
    if (dragging) {
      console.log(e.screenX);
      setStyles({
        left: e.screenX - diffX,
        top: e.screenY - diffY,
      });
      console.log(styles);
    }
  }

  function dragEnd() {
    setDragging(false);
  }

  function resizeStart(e) {
    setResizeDiffX(e.screenX);
    setOrigWidth(e.currentTarget.offsetWidth);
    setResizing(true);
  }

  function resizeRight(e) {
    if (resizing) {
      setStyles({
        width: origWidth - (resizeDiffX - e.screenX) + 500,
      });
    }
  }

  function resizeEnd() {
    setResizing(false);
  }

  // DraggableElement function interpreted from https://codesandbox.io/s/priceless-hoover-j4vpn?file=/src/index.js
  const DraggableElement = ({ dragElement, parentElement }) => {
    const dragRef = useRef(null);
    const dragRefParent = useRef(null);
    Draggable(dragRef, dragRefParent);

    return (
      <div ref={dragRefParent} className="draggable Dialog">
        <div ref={dragRef}>{dragElement}</div>
        {parentElement}
      </div>
    );
  };

  return (
    <div className="Dialog Outer" style={styles}>
      <DraggableElement
        dragElement={
          <div
            className="DialogTitle">
            My Dialog
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
    </div>
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
