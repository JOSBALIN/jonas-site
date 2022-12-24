import { useState, useEffect, useRef } from 'react';

export function UseHoverTooltip(text) {
  const element = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showTimer, setShowTimer] = useState(null);

  useEffect(() => {
    if (!element.current) return;

    const onMouseEnter = () => {
      const timer = setTimeout(() => setTooltipVisible(true), 1200);
      setShowTimer(timer);
    };
    const onMouseLeave = () => {
      clearTimeout(showTimer);
      setTooltipVisible(false);
    };
    const onMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    element.current.addEventListener('mouseenter', onMouseEnter);
    element.current.addEventListener('mouseleave', onMouseLeave);
    element.current.addEventListener('mousemove', onMouseMove);

    return () => {
      element.current.removeEventListener('mouseenter', onMouseEnter);
      element.current.removeEventListener('mouseleave', onMouseLeave);
      element.current.removeEventListener('mousemove', onMouseMove);
    };
  }, [element, showTimer]);

  return [tooltipVisible, cursorPosition, text, element];
}