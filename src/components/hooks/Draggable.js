import { useState, useEffect, useRef } from "react";
import Resizeable from "../resizeable";

// This code is borrowed from https://codesandbox.io/s/priceless-hoover-j4vpn?file=/src/useDraggable.js:0-1009
// Changes include adding an el2, which is the element to be moved, whereas el is the element that is held to drag.
// Also preventing selection of text during drag

export default function Draggable(el, el2, dragEnabled, communicator) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });
  const [currentTransform, setCurrentTransform] = useState();


  useEffect(() => {
    const handleMouseDown = (event) => {
      // prevent text-selection during drag
      event.preventDefault();
      event.stopPropagation();
      const startX = event.pageX - dx;
      const startY = event.pageY - dy;

      const handleMouseMove = (event) => {
        const newDx = event.pageX - startX;
        const newDy = event.pageY - startY;
        setOffset({ dx: newDx, dy: newDy });
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

    el.current.addEventListener("mousedown", handleMouseDown);

    return () => {
      el.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, [dx, dy]);

  useEffect(() => {
    // code that executes dragging - can be toggled
    if (dragEnabled) {
      el2.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      setCurrentTransform(el2.current.style.transform)
      communicator(currentTransform)
    }
  }, [dx, dy]);
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
  communicator
}) {


  const dragRef = useRef(null);
  const dragRefParent = useRef(null);

  // create instance of draggable
  Draggable(dragRef, dragRefParent, dragEnabled, communicator);

  const [element, setElement] = useState()


  const removeElement = () => {
    setElement(document.getElementById("dragmen"))
    console.log(element)
    element.remove()
  }

  return (
    <div
      ref={dragRefParent}
      className={"draggable-parent app-container applicationId: " + appId}
      style={{...style, ...zIndex, ...{display}}}
    >
      <div ref={dragRef} className="draggable-child app-contents">
        {dragElement}
      </div>
      {parentElement}
    </div>
  );
}
