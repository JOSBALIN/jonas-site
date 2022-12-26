import { useState, useEffect, useRef } from 'react';

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

  return (
    <div>
      {tooltipVisible && (
        <div
          className="tooltip"
          style={{
            position: 'absolute',
            left: cursorPosition.x,
            top: cursorPosition.y,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}