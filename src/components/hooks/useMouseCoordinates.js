import { useState, useEffect } from 'react';


// Boilerplate, hooks that returns mouse coordinates on window
export function useMouseCoordinates() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event) {
      setCoordinates({
        x: event.clientX,
        y: event.clientY
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return coordinates;
}
