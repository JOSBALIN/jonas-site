import React, { useRef, useEffect } from "react";

// hook taken from this link: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
// Added boolean to toggle enabled and disabled status

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, enabled, hideMenu) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        hideMenu(event)
      }
    }

    if(enabled){
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
}}, [ref, enabled]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, props.enabled, props.hideMenu);

  return <div ref={wrapperRef}>{props.children}</div>;
}