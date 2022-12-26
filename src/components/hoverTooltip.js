import { useState, useEffect } from 'react';
import "./hoverTooltip.css"

export function HoverTooltip({ text, reference }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showTimer, setShowTimer] = useState(null);

  useEffect(() => {
    if (!reference) return;

    const onMouseEnter = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      const timer = setTimeout(() => setTooltipVisible(true), 1200);
      setShowTimer(timer);
    };
    const onMouseLeave = () => {
      clearTimeout(showTimer);
      setTooltipVisible(false);
    };

    reference.addEventListener('mouseenter', onMouseEnter);
    reference.addEventListener('mouseleave', onMouseLeave);

    return () => {
      reference.removeEventListener('mouseenter', onMouseEnter);
      reference.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [reference, showTimer]);

  const tooltipStyle = {
    position: 'absolute',
    left: cursorPosition.x + 20,
    top: cursorPosition.y + 20,
    zIndex: 10000
  };

  // Add check to ensure tooltip is contained within the window
  if (cursorPosition.y + 200 > window.innerHeight) {
    tooltipStyle.top = cursorPosition.y - 200;
  }

  return (
    <div>
      {tooltipVisible && (
        <div
          className="tooltip"
          style={tooltipStyle}
        >
          {text}
        </div>
      )}
    </div>
  );
}