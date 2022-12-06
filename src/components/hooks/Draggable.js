import { useState, useEffect, useRef } from "react";

// This code is borrowed from https://codesandbox.io/s/priceless-hoover-j4vpn?file=/src/useDraggable.js:0-1009
// Changes include adding an elementToMove, which is the HTML element to be moved, whereas holdToDrag is the element that is held to drag.
// This change is to facilitate dragging only by holding on the topBar of apps rather than the entire app-window
// Also preventing selection of text during drag

export default function Draggable(holdToDrag, elementToMove, dragEnabled, communicator) {
  const [{ offsetX, offsetY }, setOffset] = useState({ offsetX: 0, offsetY: 0 });
  const [currentTransform, setCurrentTransform] = useState();


  useEffect(() => {
    const handleMouseDown = (event) => {
      // prevent text-selection during drag
      event.preventDefault();
      event.stopPropagation();
      const startX = event.pageX - offsetX;
      const startY = event.pageY - offsetY;

      const handleMouseMove = (event) => {
        if(event.pageX < 0 || event.pageX > window.innerWidth){return} // prevents dragging out of on x-axis
        if(event.pageY < 4 || event.pageY > window.innerHeight - 50 ){return} // prevents dragging out of bounds on y-axis
        const newDy = event.pageY - startY;
        const newDx = event.pageX - startX;
        setOffset({ offsetX: newDx, offsetY: newDy });
      };

      document.addEventListener("mousemove", handleMouseMove);

      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove);
        },
        { once: true }
      );
    };

    holdToDrag.current.addEventListener("mousedown", handleMouseDown);

    return () => {
      holdToDrag.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, [offsetX, offsetY]);

  useEffect(() => {
    // code that executes dragging
    if (dragEnabled) {
      elementToMove.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    }
  }, [offsetX, offsetY]);
}

// DraggableElement function interpreted from https://codesandbox.io/s/priceless-hoover-j4vpn?file=/src/index.js
export function DraggableElement({
  dragElement,
  parentElement,
  style,
  display,
  zIndex,
  dragEnabled,
  appId,
}) {
  
  // Ref elements, pointers to specific HTML elements
  const refHoldToDrag = useRef(null);
  const refElementToMove = useRef(null);

  // create instance of draggable
  Draggable(refHoldToDrag, refElementToMove, dragEnabled);


  return (
    <div
      ref={refElementToMove}
      className={"draggable-parent app-container applicationId: " + appId}
      style={{ ...style, ...zIndex, ...{ display } }}
    >
      <div ref={refHoldToDrag} className="draggable-child app-contents">
        {dragElement}
      </div>
      {parentElement}
    </div>
  );
}
